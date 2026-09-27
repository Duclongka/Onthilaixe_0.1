export interface QuestionImageItem {
  key: string;
  label?: string; // e.g. "Biển 1", "Biển 2", "Biển 3", "Vạch 1"
}

export interface Question {
  id: number;
  chapter: number;
  chapter_name: string;
  question_text: string;
  options: string[];
  correct_answer: number; // 1-based index (1, 2, 3, 4)
  image_url?: string;
  images?: QuestionImageItem[];
  is_serious_violation: boolean; // TRUE for 60 serious violation questions (điểm liệt)
  explanation?: string;
}

export type LicenseRank = 'A1' | 'A' | 'B1' | 'B' | 'C1' | 'C' | 'D1' | 'D2' | 'D' | 'BE' | 'CE';

export interface LicenseConfig {
  rank: LicenseRank;
  name: string;
  totalQuestions: number;
  passScore: number;
  durationMinutes: number;
  description: string;
}

export interface CandidateInfo {
  unit: string;
  course: string;
  sbd: string;
  licenseRank: LicenseRank;
  fullName: string;
  dob: string;
  cccd: string;
  address: string;
  photoUrl: string;
  examDate: string;
}

export interface ExamResult {
  examId: string;
  candidate: CandidateInfo;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  passScore: number;
  isPassed: boolean;
  failedDueToSerious: boolean;
  seriousQuestionFailedId?: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>;
  questions: Question[];
  submittedAt: string;
}

export interface ChapterSummary {
  id: number;
  title: string;
  description: string;
  rangeText: string;
  count: number;
  seriousCount: number;
}
