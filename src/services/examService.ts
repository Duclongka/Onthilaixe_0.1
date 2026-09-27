import { CandidateInfo, ExamResult, LicenseConfig, LicenseRank, Question } from '../types';
import { LICENSE_CONFIGS, RAW_QUESTIONS_DATA } from '../data/questionsData';

// Helper to shuffle array
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// Client-side exam generation fallback
export function clientGenerateExam(licenseRank: LicenseRank): {
  examId: string;
  config: LicenseConfig;
  questions: Question[];
} {
  const config = LICENSE_CONFIGS[licenseRank] || LICENSE_CONFIGS.B;
  const total = config.totalQuestions;

  const serious = RAW_QUESTIONS_DATA.filter((q) => q.is_serious_violation);
  const normal = RAW_QUESTIONS_DATA.filter((q) => !q.is_serious_violation);

  // Group by chapter
  const byChapter: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  for (const q of normal) {
    if (byChapter[q.chapter]) {
      byChapter[q.chapter].push(q);
    }
  }

  // 1. Pick at least 1 mandatory serious question
  const selectedSerious = shuffle(serious).slice(0, 1);
  const selectedIds = new Set(selectedSerious.map((q) => q.id));

  const quota: Record<number, number> = {
    1: Math.max(1, Math.round(total * 0.28)),
    2: Math.max(1, Math.round(total * 0.08)),
    3: Math.max(1, Math.round(total * 0.12)),
    4: Math.max(1, Math.round(total * 0.08)),
    5: Math.max(1, Math.round(total * 0.28)),
    6: Math.max(1, Math.round(total * 0.16))
  };

  const selectedQuestions: Question[] = [...selectedSerious];

  for (const ch of [1, 2, 3, 4, 5, 6]) {
    const pool = shuffle(byChapter[ch] || []).filter((q) => !selectedIds.has(q.id));
    const target = quota[ch] || 2;
    const picked = pool.slice(0, target);
    for (const p of picked) {
      selectedQuestions.push(p);
      selectedIds.add(p.id);
    }
  }

  // Backfill if needed
  if (selectedQuestions.length < total) {
    const remaining = shuffle(normal.filter((q) => !selectedIds.has(q.id)));
    for (const r of remaining) {
      if (selectedQuestions.length >= total) break;
      selectedQuestions.push(r);
      selectedIds.add(r.id);
    }
  }

  return {
    examId: `EXAM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    config,
    questions: shuffle(selectedQuestions.slice(0, total))
  };
}

// Client-side exam grading fallback
export function clientSubmitExam(
  examId: string,
  candidate: CandidateInfo,
  questions: Question[],
  userAnswers: Record<number, number>,
  timeSpentSeconds: number
): ExamResult {
  const rank = candidate.licenseRank || 'B';
  const config = LICENSE_CONFIGS[rank] || LICENSE_CONFIGS.B;

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

  return {
    examId: examId || `EXAM-${Date.now()}`,
    candidate,
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
}

// Client-side candidate simulation fallback
export function clientSimulateCandidate(
  unit?: string,
  course?: string,
  sbd?: string,
  licenseRank?: LicenseRank
): CandidateInfo {
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

  const birthYear = 1985 + Math.floor(Math.random() * 19);
  const birthMonth = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
  const birthDay = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
  const dob = `${birthDay}/${birthMonth}/${birthYear}`;

  const cccd = `001${String(birthYear).slice(2)}${Math.floor(1000000 + Math.random() * 9000000)}`;

  return {
    unit: unit || 'Trung tâm Sát hạch Lái xe CSGT',
    course: course || 'Khóa K72/2026',
    sbd: sbd || String(Math.floor(1 + Math.random() * 99)).padStart(2, '0'),
    licenseRank: licenseRank || 'B',
    fullName,
    dob,
    cccd,
    address: pick(streets),
    photoUrl: '',
    examDate: new Date().toLocaleDateString('vi-VN')
  };
}

// Client-side question query fallback
export function clientGetQuestions(
  chapter?: number,
  seriousOnly?: boolean,
  search?: string
): Question[] {
  let list = [...RAW_QUESTIONS_DATA];
  if (seriousOnly) {
    list = list.filter((q) => q.is_serious_violation);
  } else if (chapter) {
    list = list.filter((q) => q.chapter === chapter);
  }

  if (search && search.trim()) {
    const qLower = search.trim().toLowerCase();
    list = list.filter(
      (q) =>
        q.question_text.toLowerCase().includes(qLower) ||
        q.options.some((opt) => opt.toLowerCase().includes(qLower))
    );
  }

  return list;
}

// Unified API caller with automatic graceful fallback
export const examApi = {
  async generateExam(licenseRank: LicenseRank) {
    try {
      const res = await fetch('/api/exam/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseRank })
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback below
    }
    // Seamless fallback to client-side engine (e.g. on Vercel/Netlify static deployment)
    return clientGenerateExam(licenseRank);
  },

  async submitExam(
    examId: string,
    candidate: CandidateInfo,
    questions: Question[],
    userAnswers: Record<number, number>,
    timeSpentSeconds: number
  ) {
    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          candidate,
          userAnswers,
          timeSpentSeconds,
          questionIds: questions.map((q) => q.id)
        })
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback below
    }
    return clientSubmitExam(examId, candidate, questions, userAnswers, timeSpentSeconds);
  },

  async getQuestions(chapter?: number, seriousOnly?: boolean, search?: string) {
    try {
      let url = '/api/questions';
      const params = new URLSearchParams();
      if (seriousOnly) params.append('serious', 'true');
      else if (chapter) params.append('chapter', String(chapter));
      if (search) params.append('search', search);

      const qs = params.toString();
      if (qs) url += `?${qs}`;

      const res = await fetch(url);
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback below
    }
    return clientGetQuestions(chapter, seriousOnly, search);
  },

  async simulateCandidate(unit?: string, course?: string, sbd?: string, licenseRank?: LicenseRank) {
    try {
      const res = await fetch('/api/candidate/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit, course, sbd, licenseRank })
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback below
    }
    return clientSimulateCandidate(unit, course, sbd, licenseRank);
  }
};
