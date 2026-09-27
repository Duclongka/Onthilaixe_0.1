import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CHAPTER_LIST } from '../data/questionsData';
import { examApi } from '../services/examService';
import { SvgVisual } from './SvgVisual';
import { BookOpen, ShieldAlert, Check, X, Search, ChevronRight } from 'lucide-react';

interface StudyModeProps {
  initialChapter?: number;
  initialSeriousOnly?: boolean;
  onClose: () => void;
  onStartExamWithChapter?: (chapterId: number) => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({
  initialChapter = 1,
  initialSeriousOnly = false,
  onClose,
  onStartExamWithChapter
}) => {
  const [selectedChapter, setSelectedChapter] = useState<number>(initialChapter);
  const [seriousOnly, setSeriousOnly] = useState<boolean>(initialSeriousOnly);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchQuestions();
  }, [selectedChapter, seriousOnly]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await examApi.getQuestions(seriousOnly ? undefined : selectedChapter, seriousOnly);
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (id: number) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = questions.filter(q => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return q.question_text.toLowerCase().includes(query) || q.options.some(o => o.toLowerCase().includes(query));
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-700" />
            {seriousOnly ? 'Chuyên Đề 60 Câu Hỏi Điểm Liệt' : 'Ôn Tập Theo Từng Chương 600 Câu'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tra cứu toàn bộ câu hỏi, xem đáp án chuẩn từ tài liệu gốc Cục CSGT và mẹo ghi nhớ nhanh.
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Đóng ôn tập
        </button>
      </div>

      {/* Chapter Tabs & Filter Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSeriousOnly(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              seriousOnly
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            60 Câu điểm liệt
          </button>

          {CHAPTER_LIST.map(ch => (
            <button
              key={ch.id}
              type="button"
              onClick={() => {
                setSeriousOnly(false);
                setSelectedChapter(ch.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !seriousOnly && selectedChapter === ch.id
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Chương {ch.id} ({ch.count} câu)
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm từ khóa câu hỏi, biển báo, quy tắc..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>

      {/* Question list */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          Đang tải dữ liệu từ cơ sở dữ liệu SQLite...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          Không tìm thấy câu hỏi phù hợp.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-medium">
            Hiển thị {filtered.length} câu hỏi
          </div>

          {filtered.map(q => {
            const isRevealed = revealedIds.has(q.id);

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${
                  q.is_serious_violation ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm font-mono">
                      Câu {q.id}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Chương {q.chapter}
                    </span>
                    {q.is_serious_violation && (
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Điểm liệt
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleReveal(q.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-red-700 underline"
                  >
                    {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án & giải thích'}
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-900 mb-3">
                  {q.question_text}
                </p>

                {/* Question illustration with multi-images support */}
                {(q.images || q.image_url) && (
                  <div className="max-w-xl mx-auto my-3">
                    <SvgVisual images={q.images} imageKey={q.image_url} />
                  </div>
                )}

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const optNum = optIdx + 1;
                    const isCorrect = q.correct_answer === optNum;

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-colors ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {optNum}
                        </span>
                        <span className="flex-1 pt-0.5">{opt}</span>
                        {isRevealed && isCorrect && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300 shrink-0">
                            Đáp án đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isRevealed && q.explanation && (
                  <div className="mt-3.5 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                    <span className="font-bold">Mẹo & Căn cứ: </span>
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
