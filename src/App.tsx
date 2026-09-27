import React, { useState } from 'react';
import { CandidateInfo, ExamResult, LicenseConfig, LicenseRank, Question } from './types';
import { LICENSE_CONFIGS } from './data/questionsData';
import { examApi } from './services/examService';
import { Navbar } from './components/Navbar';
import { CandidateLogin } from './components/CandidateLogin';
import { ExamScreen } from './components/ExamScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { StudyMode } from './components/StudyModeModal';
import { AboutRegulations } from './components/AboutRegulations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'exam' | 'serious' | 'chapters' | 'about'>('exam');
  const [selectedRank, setSelectedRank] = useState<LicenseRank>('B');
  const [candidate, setCandidate] = useState<CandidateInfo | null>(null);
  const [activeScreen, setActiveScreen] = useState<'login' | 'exam' | 'review' | 'study'>('login');

  // Exam state
  const [currentExam, setCurrentExam] = useState<{
    examId: string;
    config: LicenseConfig;
    questions: Question[];
  } | null>(null);

  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [studyChapter, setStudyChapter] = useState<number>(1);
  const [studySeriousOnly, setStudySeriousOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Start exam flow
  const handleStartExam = async (mode: 'full' | 'serious' | 'chapter', chapterId?: number) => {
    setLoading(true);

    // If candidate not yet checked, auto-generate default candidate
    let activeCandidate = candidate;
    if (!activeCandidate) {
      activeCandidate = (await examApi.simulateCandidate(
        'Trung tâm Sát hạch Lái xe CSGT',
        'Khóa K72/2026',
        String(Math.floor(1 + Math.random() * 99)).padStart(2, '0'),
        selectedRank
      )) as CandidateInfo;
      setCandidate(activeCandidate);
    }

    try {
      if (mode === 'serious') {
        const seriousList = await examApi.getQuestions(undefined, true);
        const config = LICENSE_CONFIGS[selectedRank] || LICENSE_CONFIGS.B;

        setCurrentExam({
          examId: `SERIOUS-${Date.now()}`,
          config: {
            ...config,
            totalQuestions: Math.min(config.totalQuestions, seriousList.length),
            durationMinutes: 20
          },
          questions: seriousList.slice(0, config.totalQuestions)
        });
      } else {
        const data = await examApi.generateExam(selectedRank);
        setCurrentExam(data);
      }

      setActiveScreen('exam');
    } catch (err) {
      console.error('Failed to generate exam:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit exam flow
  const handleSubmitExam = async (answers: Record<number, number>, timeSpent: number) => {
    if (!currentExam || !candidate) return;
    setLoading(true);

    try {
      const result = await examApi.submitExam(
        currentExam.examId,
        candidate,
        currentExam.questions,
        answers,
        timeSpent
      );
      setExamResult(result);
      setActiveScreen('review');
    } catch (err) {
      console.error('Failed to submit exam:', err);
    } finally {
      setLoading(false);
    }
  };

  // Retake same exam
  const handleRetakeExam = () => {
    if (currentExam) {
      setActiveScreen('exam');
    } else {
      handleStartExam('full');
    }
  };

  // New exam
  const handleNewExam = () => {
    handleStartExam('full');
  };

  const handleTabChange = (tab: 'exam' | 'serious' | 'chapters' | 'about') => {
    setCurrentTab(tab);
    if (tab === 'exam') {
      setActiveScreen('login');
    } else if (tab === 'serious') {
      setStudySeriousOnly(true);
      setActiveScreen('study');
    } else if (tab === 'chapters') {
      setStudySeriousOnly(false);
      setStudyChapter(1);
      setActiveScreen('study');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-red-600 selection:text-white">
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        selectedRank={selectedRank}
        onSelectRank={setSelectedRank}
        isExamInProgress={activeScreen === 'exam'}
      />

      <main className="flex-1 pb-16">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs text-white">
            <div className="bg-slate-900 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700">
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-semibold">Đang nạp đề sát hạch từ cơ sở dữ liệu...</span>
            </div>
          </div>
        )}

        {currentTab === 'about' ? (
          <AboutRegulations />
        ) : activeScreen === 'study' ? (
          <StudyMode
            initialChapter={studyChapter}
            initialSeriousOnly={studySeriousOnly}
            onClose={() => {
              setCurrentTab('exam');
              setActiveScreen('login');
            }}
          />
        ) : activeScreen === 'login' ? (
          <CandidateLogin
            selectedRank={selectedRank}
            onSelectRank={setSelectedRank}
            candidate={candidate}
            onVerifyCandidate={setCandidate}
            onStartExam={handleStartExam}
          />
        ) : activeScreen === 'exam' && currentExam && candidate ? (
          <ExamScreen
            examId={currentExam.examId}
            candidate={candidate}
            config={currentExam.config}
            questions={currentExam.questions}
            onSubmitExam={handleSubmitExam}
            onExitExam={() => setActiveScreen('login')}
          />
        ) : activeScreen === 'review' && examResult ? (
          <ReviewScreen
            result={examResult}
            onRetakeExam={handleRetakeExam}
            onNewExam={handleNewExam}
            onGoHome={() => {
              setCurrentTab('exam');
              setActiveScreen('login');
            }}
          />
        ) : null}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Hệ thống Ôn luyện & Sát hạch Lý thuyết Lái xe Cơ giới Đường bộ
          </p>
          <p>
            Dựa trên chuẩn 600 câu hỏi Cục Cảnh sát Giao thông - Bộ Công An · Phát triển bởi Loong Lee 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
