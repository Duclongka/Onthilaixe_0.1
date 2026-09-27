import React, { useState, useEffect, useCallback } from 'react';
import { CandidateInfo, LicenseConfig, Question } from '../types';
import { SvgVisual } from './SvgVisual';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ExamScreenProps {
  examId: string;
  candidate: CandidateInfo;
  config: LicenseConfig;
  questions: Question[];
  onSubmitExam: (answers: Record<number, number>, timeSpentSeconds: number) => void;
  onExitExam: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  candidate,
  config,
  questions,
  onSubmitExam,
  onExitExam
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState(config.durationMinutes * 60);
  const [isSubmittingModalOpen, setIsSubmittingModalOpen] = useState(false);
  const [startTime] = useState<number>(Date.now());

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Handle countdown timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  // Answer handler
  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // Toggle flag
  const toggleFlag = (index: number) => {
    setFlaggedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Final submit handler
  const handleFinalSubmit = useCallback(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onSubmitExam(userAnswers, timeSpent);
  }, [userAnswers, startTime, onSubmitExam]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmittingModalOpen) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optionNum = Number(e.key);
        if (currentQuestion && optionNum <= currentQuestion.options.length) {
          handleSelectOption(optionNum);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, currentQuestion, isSubmittingModalOpen]);

  // Format MM:SS
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = secondsRemaining < 120; // less than 2 minutes

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="relative min-h-screen">
      {/* 1. FLOATING BUBBLE COUNTDOWN TIMER (Luôn hiển thị ở góc phải trên màn hình khi vuốt/cuộn) */}
      <aside
        aria-label="Đồng hồ đếm ngược thời gian thi"
        className="fixed top-20 right-3 sm:right-6 z-50 pointer-events-auto"
      >
        <div
          className={`flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 border select-none group ${
            isTimeCritical
              ? 'bg-red-600/95 border-red-400 text-white animate-pulse ring-2 ring-red-400 shadow-red-500/50'
              : 'bg-slate-900/90 hover:bg-slate-900 border-slate-700 text-white shadow-slate-900/40 ring-1 ring-white/10'
          }`}
          title="Thời gian làm bài thi còn lại"
        >
          {/* Animated pulsing dot / clock */}
          <div className="relative flex items-center justify-center">
            <span
              className={`absolute w-3 h-3 rounded-full opacity-75 animate-ping ${
                isTimeCritical ? 'bg-red-300' : 'bg-emerald-400'
              }`}
            />
            <Clock
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 ${
                isTimeCritical ? 'text-white' : 'text-emerald-400'
              }`}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-75 leading-none">
              Thời gian
            </span>
            <span className="font-mono font-black text-sm sm:text-base tracking-wider leading-none mt-0.5">
              {timeString}
            </span>
          </div>
        </div>
      </aside>

      {/* 2. STICKY FROZEN HEADER: Đóng băng thông tin thí sinh và nút Kết thúc phía trên */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Candidate Profile Frozen Bar */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-xs">
              {candidate.licenseRank}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {candidate.fullName}
                </span>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-bold shrink-0">
                  SBD: {candidate.sbd}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 truncate hidden sm:block">
                {candidate.unit} · {candidate.course}
              </div>
            </div>
          </div>

          {/* Quick Progress Indicator & Frozen End Button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex flex-col items-end text-xs mr-2">
              <span className="text-slate-500">Tiến độ làm bài</span>
              <span className="font-bold text-slate-900 font-mono">
                {answeredCount}/{totalQuestions} câu
              </span>
            </div>

            {/* Frozen End / Submit Button */}
            <button
              type="button"
              onClick={() => setIsSubmittingModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg transition-colors shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Kết thúc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Active Question Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-xs">
              {/* Question Header & Serious Alert */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900 text-base">
                    Câu {currentIndex + 1}
                    <span className="text-slate-400 font-normal text-sm">/{totalQuestions}</span>
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 font-medium">Chương {currentQuestion.chapter}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlag(currentIndex)}
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded transition-colors ${
                      flaggedIndices.has(currentIndex)
                        ? 'bg-amber-100 text-amber-800 font-semibold'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                    title="Đánh dấu câu hỏi để xem lại sau"
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedIndices.has(currentIndex) ? 'fill-current text-amber-600' : ''}`} />
                    <span>{flaggedIndices.has(currentIndex) ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                  </button>
                </div>
              </div>

              {/* Serious violation warning badge if applicable */}
              {currentQuestion.is_serious_violation && (
                <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded-r-lg mb-4 flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-red-800 uppercase tracking-wide">
                      CÂU HỎI TÌNH HUỐNG MẤT AN TOÀN GIAO THÔNG NGHIÊM TRỌNG (ĐIỂM LIỆT)
                    </p>
                    <p className="text-[11px] text-red-700 mt-0.5">
                      * Thí sinh trả lời sai câu hỏi này sẽ bị đình chỉ chấm Đạt và bị đánh giá <strong>KHÔNG ĐẠT (TRƯỢT)</strong> toàn bài thi!
                    </p>
                  </div>
                </div>
              )}

              {/* Question Text */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-4">
                {currentQuestion.question_text}
              </h2>

              {/* Illustration with full multi-images support */}
              {(currentQuestion.images || currentQuestion.image_url) && (
                <div className="max-w-xl mx-auto my-4">
                  <SvgVisual
                    images={currentQuestion.images}
                    imageKey={currentQuestion.image_url}
                  />
                </div>
              )}

              {/* Options list */}
              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((optionText, idx) => {
                  const optionNum = idx + 1;
                  const isSelected = userAnswers[currentQuestion.id] === optionNum;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(optionNum)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'border-red-600 bg-red-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-red-700 text-white'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                        }`}
                      >
                        {optionNum}
                      </span>
                      <span
                        className={`text-sm leading-relaxed pt-0.5 ${
                          isSelected ? 'font-semibold text-slate-900' : 'text-slate-800'
                        }`}
                      >
                        {optionText}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                <span className="text-xs text-slate-400 hidden sm:inline">
                  Dùng phím số [1, 2, 3, 4] để chọn · [← / →] chuyển câu
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={currentIndex === totalQuestions - 1}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Câu sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Question Navigator Matrix (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <h3 className="text-sm font-bold text-slate-900">Danh sách câu hỏi</h3>
                <span className="text-xs text-slate-500 font-mono">
                  {answeredCount}/{totalQuestions} đã làm
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-red-600 h-full transition-all duration-300"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Number Tiles */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedIndices.has(idx);

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative h-10 rounded-lg text-xs font-bold font-mono transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-red-600 ring-offset-2 z-10'
                          : ''
                      } ${
                        isAnswered
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {q.is_serious_violation && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-1 ring-white" title="Câu điểm liệt" />
                      )}
                      {isFlagged && (
                        <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-1 ring-white" title="Đã đánh dấu" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-slate-900"></span>
                  <span>Đã trả lời</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300"></span>
                  <span>Chưa trả lời</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-white ring-2 ring-red-600"></span>
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>Cần xem lại</span>
                </div>
              </div>
            </div>

            {/* Exam Summary Notice */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-900 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                Lưu ý phòng thi
              </p>
              <p>
                Đồng hồ đếm ngược bong bóng luôn bám sát ở góc trên phải. Bấm nút <strong>"Kết thúc"</strong> trên thanh cố định bất kỳ lúc nào để nộp bài.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal before early submit */}
      {isSubmittingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Xác nhận nộp bài sát hạch?</h3>
                <p className="text-xs text-slate-500">Kỳ thi sát hạch lý thuyết lái xe</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 my-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Số câu đã trả lời:</span>
                <span className="font-bold text-slate-900">{answeredCount}/{totalQuestions} câu</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Số câu chưa trả lời:</span>
                <span className={`font-bold ${unansweredCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {unansweredCount} câu
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Thời gian còn lại:</span>
                <span className="font-mono font-bold text-slate-900">{timeString}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg mb-4 flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Bạn vẫn còn <strong>{unansweredCount} câu hỏi</strong> chưa trả lời. Những câu chưa chọn sẽ bị tính là trả lời sai.
                </span>
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsSubmittingModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
