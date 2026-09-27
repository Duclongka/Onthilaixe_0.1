import React, { useState } from 'react';
import { ExamResult } from '../types';
import { SvgVisual } from './SvgVisual';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  PlusCircle,
  Home,
  Check,
  X,
  BookOpen,
  Clock,
  Award
} from 'lucide-react';

interface ReviewScreenProps {
  result: ExamResult;
  onRetakeExam: () => void;
  onNewExam: () => void;
  onGoHome: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  result,
  onRetakeExam,
  onNewExam,
  onGoHome
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong' | 'serious'>('all');

  const {
    candidate,
    score,
    totalQuestions,
    passScore,
    isPassed,
    failedDueToSerious,
    correctCount,
    incorrectCount,
    unansweredCount,
    timeSpentSeconds,
    userAnswers,
    questions
  } = result;

  const minutesSpent = Math.floor(timeSpentSeconds / 60);
  const secondsSpent = timeSpentSeconds % 60;

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    const userChoice = userAnswers[q.id];
    const isCorrect = userChoice === q.correct_answer;

    if (filter === 'correct') return isCorrect;
    if (filter === 'wrong') return !isCorrect;
    if (filter === 'serious') return q.is_serious_violation;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Result Hero Banner */}
      <div
        className={`rounded-2xl border p-6 sm:p-8 shadow-sm ${
          isPassed
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : failedDueToSerious
            ? 'bg-red-50 border-red-300 text-red-950 ring-2 ring-red-500'
            : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4 text-center sm:text-left">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                isPassed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {isPassed ? (
                <Award className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-white/80 shadow-xs">
                  Hạng {candidate.licenseRank || 'B'} · SBD {candidate.sbd}
                </span>
                <span className="text-xs text-slate-500">
                  {candidate.fullName}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isPassed ? 'KẾT QUẢ: ĐẠT' : 'KẾT QUẢ: KHÔNG ĐẠT'}
              </h1>

              {failedDueToSerious ? (
                <div className="mt-2 p-3 bg-red-100/80 border border-red-300 rounded-xl text-red-900 text-xs sm:text-sm font-semibold flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>CẢNH BÁO ĐIỂM LIỆT:</strong> Thí sinh đã trả lời sai câu hỏi thuộc nhóm tình huống mất an toàn giao thông nghiêm trọng! Theo quy chế sát hạch của Cục CSGT, bài thi bị đánh giá <strong>TRƯỢT</strong> dù điểm số đạt {score}/{totalQuestions}.
                  </span>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {isPassed
                    ? `Chúc mừng bạn đã vượt qua bài thi sát hạch lý thuyết lái xe với số điểm ${score}/${totalQuestions} (Yêu cầu ≥ ${passScore}/${totalQuestions}).`
                    : `Bạn đạt ${score}/${totalQuestions} điểm, chưa đủ điểm chuẩn tối thiểu (${passScore}/${totalQuestions}) để đạt yêu cầu.`}
                </p>
              )}
            </div>
          </div>

          {/* Big Score Box */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 text-center shrink-0 min-w-[140px] shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Điểm số
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 my-0.5">
              {score}
              <span className="text-base text-slate-400 font-normal">/{totalQuestions}</span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isPassed ? 'ĐỦ ĐIỂM ĐẠT' : 'CHƯA ĐẠT'}
            </span>
          </div>
        </div>

        {/* Breakdown Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200/60 text-xs">
          <div className="bg-white/70 p-3 rounded-lg flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-slate-400 block text-[10px]">Số câu đúng</span>
              <span className="font-bold text-slate-900 text-sm">{correctCount} câu</span>
            </div>
          </div>

          <div className="bg-white/70 p-3 rounded-lg flex items-center gap-2.5">
            <XCircle className="w-4 h-4 text-red-600" />
            <div>
              <span className="text-slate-400 block text-[10px]">Số câu sai</span>
              <span className="font-bold text-slate-900 text-sm">{incorrectCount} câu</span>
            </div>
          </div>

          <div className="bg-white/70 p-3 rounded-lg flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <span className="text-slate-400 block text-[10px]">Thời gian làm</span>
              <span className="font-bold text-slate-900 text-sm">
                {minutesSpent}p {secondsSpent}s
              </span>
            </div>
          </div>

          <div className="bg-white/70 p-3 rounded-lg flex items-center gap-2.5">
            <AlertTriangle className={`w-4 h-4 ${failedDueToSerious ? 'text-red-600' : 'text-emerald-600'}`} />
            <div>
              <span className="text-slate-400 block text-[10px]">Câu điểm liệt</span>
              <span className={`font-bold text-sm ${failedDueToSerious ? 'text-red-700' : 'text-emerald-700'}`}>
                {failedDueToSerious ? 'Trả lời SAI' : 'Đạt chuẩn'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetakeExam}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors shadow-xs active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại đề này</span>
          </button>

          <button
            type="button"
            onClick={onNewExam}
            className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors shadow-xs active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo đề thi mới</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Chi tiết bài thi</h2>
            <p className="text-xs text-slate-500">
              Kiểm tra các câu làm đúng, câu làm sai và đọc giải thích mẹo thi
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'correct'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đúng ({correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('wrong')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'wrong'
                  ? 'bg-white text-red-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sai ({incorrectCount + unansweredCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('serious')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'serious'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Điểm liệt
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-5">
          {filteredQuestions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correct_answer;
            const originalIndex = questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-xl p-5 sm:p-6 shadow-xs transition-all ${
                  isCorrect
                    ? 'border-slate-200'
                    : q.is_serious_violation
                    ? 'border-red-400 ring-1 ring-red-300'
                    : 'border-rose-200'
                }`}
              >
                {/* Header item */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm sm:text-base font-mono">
                      Câu {originalIndex + 1}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Chương {q.chapter}
                    </span>
                    {q.is_serious_violation && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          Câu điểm liệt
                        </span>
                      </>
                    )}
                  </div>

                  {/* Status chip */}
                  <div className="flex items-center gap-1.5">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        Đúng (+1đ)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                        <X className="w-3.5 h-3.5" />
                        {userChoice ? 'Sai' : 'Chưa trả lời'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question title */}
                <p className="text-sm sm:text-base font-semibold text-slate-900 mb-3 leading-relaxed">
                  {q.question_text}
                </p>

                {/* Question illustration if present with multi-images support */}
                {(q.images || q.image_url) && (
                  <div className="max-w-xl mx-auto my-3">
                    <SvgVisual images={q.images} imageKey={q.image_url} />
                  </div>
                )}

                {/* Options display with chosen vs correct indicators */}
                <div className="space-y-2 mt-3">
                  {q.options.map((opt, optIdx) => {
                    const optNum = optIdx + 1;
                    const isUserChoice = userChoice === optNum;
                    const isActualCorrect = q.correct_answer === optNum;

                    let rowStyle = 'border-slate-200 bg-slate-50 text-slate-700';
                    let badgeStyle = 'bg-slate-200 text-slate-700';

                    if (isActualCorrect) {
                      rowStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold';
                      badgeStyle = 'bg-emerald-600 text-white';
                    } else if (isUserChoice && !isActualCorrect) {
                      rowStyle = 'border-red-400 bg-red-50/80 text-red-950 font-medium';
                      badgeStyle = 'bg-red-600 text-white';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border flex items-start justify-between gap-3 text-xs sm:text-sm ${rowStyle}`}
                      >
                        <div className="flex items-start gap-2.5 flex-1">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}
                          >
                            {optNum}
                          </span>
                          <span className="leading-relaxed pt-0.5">{opt}</span>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 text-xs">
                          {isUserChoice && (
                            <span className="text-[11px] text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-300">
                              Bạn chọn
                            </span>
                          )}
                          {isActualCorrect && (
                            <span className="text-[11px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
                              Đáp án đúng
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="mt-4 p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-blue-950">
                      <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                      Giải thích & Căn cứ quy định
                    </div>
                    <p className="leading-relaxed text-blue-800">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
