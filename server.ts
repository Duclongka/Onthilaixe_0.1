import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getDb,
  fetchAllQuestions,
  fetchQuestionsByChapter,
  fetchSeriousQuestions,
  fetchQuestionById,
  generateExamQuestions
} from './src/db/sqlite.ts';
import { CHAPTER_LIST, LICENSE_CONFIGS } from './src/data/questionsData.ts';
import { CandidateInfo, ExamResult, LicenseRank, Question } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Initialize SQLite database
  await getDb();
  console.log('SQLite database initialized successfully.');

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get all chapters
  app.get('/api/chapters', (req, res) => {
    res.json(CHAPTER_LIST);
  });

  // Get license rank configs
  app.get('/api/licenses', (req, res) => {
    res.json(LICENSE_CONFIGS);
  });

  // Get questions with optional filters
  app.get('/api/questions', async (req, res) => {
    try {
      const chapter = req.query.chapter ? Number(req.query.chapter) : undefined;
      const serious = req.query.serious === 'true';
      const search = req.query.search ? String(req.query.search).toLowerCase() : undefined;

      let questions: Question[] = [];
      if (serious) {
        questions = await fetchSeriousQuestions();
      } else if (chapter) {
        questions = await fetchQuestionsByChapter(chapter);
      } else {
        questions = await fetchAllQuestions();
      }

      if (search) {
        questions = questions.filter(q =>
          q.question_text.toLowerCase().includes(search) ||
          q.options.some(opt => opt.toLowerCase().includes(search))
        );
      }

      res.json(questions);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get single question
  app.get('/api/questions/:id', async (req, res) => {
    try {
      const q = await fetchQuestionById(Number(req.params.id));
      if (!q) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(q);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Simulate candidate information
  app.post('/api/candidate/simulate', (req, res) => {
    const { unit, course, sbd, licenseRank } = req.body || {};

    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô'];
    const middleNames = ['Văn', 'Thị', 'Đình', 'Hồng', 'Thành', 'Quỳnh', 'Minh', 'Đức', 'Xuân', 'Ngọc'];
    const lastNames = ['An', 'Bình', 'Chung', 'Dũng', 'Hải', 'Hảo', 'Linh', 'Long', 'Mai', 'Nam', 'Tâm', 'Tuấn'];

    const streets = [
      '112 Lê Duẩn, P. Cửa Nam, Q. Hoàn Kiếm, Hà Nội',
      '45 Hai Bà Trưng, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội',
      '88 Nguyễn Trãi, P. Thượng Đình, Q. Thanh Xuân, Hà Nội',
      '256 Cầu Giấy, P. Quan Hoa, Q. Cầu Giấy, Hà Nội',
      '15 Võ Văn Kiệt, P. Cô Giang, Quận 1, TP. Hồ Chí Minh',
      '128 Nguyễn Thị Minh Khai, Quận 3, TP. Hồ Chí Minh',
      '50 Quang Trung, P. Thạch Thang, Q. Hải Châu, Đà Nẵng'
    ];

    const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const fullName = `${pick(firstNames)} ${pick(middleNames)} ${pick(lastNames)}`;

    // Generate random birth year between 1980 and 2005
    const birthYear = 1985 + Math.floor(Math.random() * 19);
    const birthMonth = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const birthDay = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    const dob = `${birthDay}/${birthMonth}/${birthYear}`;

    // 12-digit CCCD
    const cccd = `001${String(birthYear).slice(2)}${Math.floor(1000000 + Math.random() * 9000000)}`;

    const candidate: CandidateInfo = {
      unit: unit || 'Trung tâm Sát hạch Lái xe CSGT',
      course: course || 'Khóa K72/2026',
      sbd: sbd || String(Math.floor(1 + Math.random() * 99)).padStart(2, '0'),
      licenseRank: (licenseRank as LicenseRank) || 'B',
      fullName,
      dob,
      cccd,
      address: pick(streets),
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      examDate: new Date().toLocaleDateString('vi-VN')
    };

    res.json(candidate);
  });

  // Generate an official exam
  app.post('/api/exam/generate', async (req, res) => {
    try {
      const { licenseRank } = req.body || {};
      const config = LICENSE_CONFIGS[(licenseRank as LicenseRank) || 'B'] || LICENSE_CONFIGS['B'];
      const questions = await generateExamQuestions(config.totalQuestions);

      res.json({
        examId: `EXAM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        config,
        questions
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Submit and grade exam
  app.post('/api/exam/submit', async (req, res) => {
    try {
      const { examId, candidate, userAnswers = {}, timeSpentSeconds = 0, questionIds = [] } = req.body;

      const questions: Question[] = [];
      for (const id of questionIds) {
        const q = await fetchQuestionById(id);
        if (q) questions.push(q);
      }

      const rank = (candidate?.licenseRank as LicenseRank) || 'B';
      const config = LICENSE_CONFIGS[rank] || LICENSE_CONFIGS['B'];

      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;
      let failedDueToSerious = false;
      let seriousQuestionFailedId: number | undefined;

      for (const q of questions) {
        const userChoice = userAnswers[q.id];
        if (userChoice === undefined || userChoice === null) {
          unansweredCount++;
          if (q.is_serious_violation) {
            failedDueToSerious = true;
            seriousQuestionFailedId = q.id;
          }
        } else if (Number(userChoice) === q.correct_answer) {
          correctCount++;
        } else {
          incorrectCount++;
          if (q.is_serious_violation) {
            failedDueToSerious = true;
            seriousQuestionFailedId = q.id;
          }
        }
      }

      const score = correctCount;
      const passScore = config.passScore;
      const isPassed = !failedDueToSerious && score >= passScore;

      const result: ExamResult = {
        examId: examId || `EXAM-${Date.now()}`,
        candidate: candidate || {},
        totalQuestions: questions.length,
        correctCount,
        incorrectCount,
        unansweredCount,
        score,
        passScore,
        isPassed,
        failedDueToSerious,
        seriousQuestionFailedId,
        timeSpentSeconds,
        userAnswers,
        questions,
        submittedAt: new Date().toISOString()
      };

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // System stats
  app.get('/api/stats', async (req, res) => {
    try {
      const all = await fetchAllQuestions();
      const serious = all.filter(q => q.is_serious_violation);
      res.json({
        totalQuestionsInDb: all.length,
        totalSeriousQuestions: serious.length,
        chaptersCount: CHAPTER_LIST.length,
        dbStatus: 'Connected & Active (SQLite)'
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // In development, hook Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serve
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
