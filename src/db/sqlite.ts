import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { RAW_QUESTIONS_DATA } from '../data/questionsData.ts';
import { Question } from '../types';

let dbInstance: Database | null = null;
const DB_FILE_PATH = path.resolve(process.cwd(), 'driving_exam.sqlite');

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_FILE_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_FILE_PATH);
      dbInstance = new SQL.Database(fileBuffer);
    } catch {
      dbInstance = new SQL.Database();
    }
  } else {
    dbInstance = new SQL.Database();
  }

  // Ensure table schema
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY,
      chapter INTEGER NOT NULL,
      chapter_name TEXT NOT NULL,
      question_text TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_answer INTEGER NOT NULL,
      image_url TEXT,
      is_serious_violation INTEGER NOT NULL DEFAULT 0,
      explanation TEXT
    );
  `);

  // Check if questions are already seeded
  const checkStmt = dbInstance.exec("SELECT count(*) as count FROM questions;");
  const count = checkStmt.length > 0 && checkStmt[0].values.length > 0 ? (checkStmt[0].values[0][0] as number) : 0;

  // Force re-seed to ensure all updated question images are refreshed
  seedQuestions(dbInstance);
  saveDbToDisk();

  return dbInstance;
}

export function seedQuestions(db: Database) {
  const insertSql = `
    INSERT OR REPLACE INTO questions 
    (id, chapter, chapter_name, question_text, options, correct_answer, image_url, is_serious_violation, explanation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  for (const q of RAW_QUESTIONS_DATA) {
    const serializedImages = q.images ? JSON.stringify(q.images) : (q.image_url || null);
    db.run(insertSql, [
      q.id,
      q.chapter,
      q.chapter_name,
      q.question_text,
      JSON.stringify(q.options),
      q.correct_answer,
      serializedImages,
      q.is_serious_violation ? 1 : 0,
      q.explanation || null
    ]);
  }
}

export function saveDbToDisk() {
  if (!dbInstance) return;
  try {
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE_PATH, buffer);
  } catch (err) {
    console.error('Failed to save SQLite file to disk:', err);
  }
}

function rowToQuestion(row: any[]): Question {
  const [id, chapter, chapter_name, question_text, optionsJson, correct_answer, image_url, is_serious_violation, explanation] = row;
  let options: string[] = [];
  try {
    options = JSON.parse(optionsJson);
  } catch {
    options = [];
  }

  let images: any = undefined;
  let parsedImageUrl: string | undefined = undefined;

  if (image_url) {
    const str = String(image_url).trim();
    if (str.startsWith('[') && str.endsWith(']')) {
      try {
        images = JSON.parse(str);
      } catch {
        parsedImageUrl = str;
      }
    } else {
      parsedImageUrl = str;
    }
  }

  return {
    id: Number(id),
    chapter: Number(chapter),
    chapter_name: String(chapter_name || ''),
    question_text: String(question_text || ''),
    options,
    correct_answer: Number(correct_answer),
    image_url: parsedImageUrl,
    images,
    is_serious_violation: Number(is_serious_violation) === 1,
    explanation: explanation ? String(explanation) : undefined
  };
}

export async function fetchAllQuestions(): Promise<Question[]> {
  const db = await getDb();
  const res = db.exec("SELECT id, chapter, chapter_name, question_text, options, correct_answer, image_url, is_serious_violation, explanation FROM questions ORDER BY id ASC;");
  if (!res || res.length === 0) return [];
  return res[0].values.map(rowToQuestion);
}

export async function fetchQuestionsByChapter(chapter: number): Promise<Question[]> {
  const db = await getDb();
  const stmt = db.prepare("SELECT id, chapter, chapter_name, question_text, options, correct_answer, image_url, is_serious_violation, explanation FROM questions WHERE chapter = :chapter ORDER BY id ASC;");
  stmt.bind({ ':chapter': chapter });
  const results: Question[] = [];
  while (stmt.step()) {
    results.push(rowToQuestion(stmt.get()));
  }
  stmt.free();
  return results;
}

export async function fetchSeriousQuestions(): Promise<Question[]> {
  const db = await getDb();
  const res = db.exec("SELECT id, chapter, chapter_name, question_text, options, correct_answer, image_url, is_serious_violation, explanation FROM questions WHERE is_serious_violation = 1 ORDER BY id ASC;");
  if (!res || res.length === 0) return [];
  return res[0].values.map(rowToQuestion);
}

export async function fetchQuestionById(id: number): Promise<Question | null> {
  const db = await getDb();
  const stmt = db.prepare("SELECT id, chapter, chapter_name, question_text, options, correct_answer, image_url, is_serious_violation, explanation FROM questions WHERE id = :id LIMIT 1;");
  stmt.bind({ ':id': id });
  if (stmt.step()) {
    const q = rowToQuestion(stmt.get());
    stmt.free();
    return q;
  }
  stmt.free();
  return null;
}

// Generate an official 30-question exam according to chapter distribution and mandatory serious question rule
export async function generateExamQuestions(total = 30): Promise<Question[]> {
  const all = await fetchAllQuestions();
  const serious = all.filter(q => q.is_serious_violation);
  const normal = all.filter(q => !q.is_serious_violation);

  // Group normal questions by chapter
  const byChapter: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  for (const q of normal) {
    if (byChapter[q.chapter]) {
      byChapter[q.chapter].push(q);
    }
  }

  // Shuffle helper
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  // 1. Mandatory at least 1 serious question (or 1-2)
  const selectedSerious = shuffle(serious).slice(0, 1);
  const selectedIds = new Set(selectedSerious.map(q => q.id));

  // 2. Select by chapter proportions
  // Official distribution for 30 questions:
  // Ch1: ~8-9, Ch2: ~2, Ch3: ~3, Ch4: ~2, Ch5: ~9, Ch6: ~5
  const quota: Record<number, number> = {
    1: 8,
    2: 2,
    3: 3,
    4: 2,
    5: 9,
    6: 5
  };

  const selectedQuestions: Question[] = [...selectedSerious];

  for (const ch of [1, 2, 3, 4, 5, 6]) {
    const pool = shuffle(byChapter[ch] || []).filter(q => !selectedIds.has(q.id));
    const target = quota[ch] || 2;
    const picked = pool.slice(0, target);
    for (const p of picked) {
      selectedQuestions.push(p);
      selectedIds.add(p.id);
    }
  }

  // If still under total, backfill from remaining normal questions
  if (selectedQuestions.length < total) {
    const remaining = shuffle(normal.filter(q => !selectedIds.has(q.id)));
    for (const r of remaining) {
      if (selectedQuestions.length >= total) break;
      selectedQuestions.push(r);
      selectedIds.add(r.id);
    }
  }

  // Trim to exact total if exceeded
  return shuffle(selectedQuestions.slice(0, total));
}
