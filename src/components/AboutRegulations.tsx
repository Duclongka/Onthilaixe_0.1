import React from 'react';
import { LICENSE_CONFIGS, CHAPTER_LIST } from '../data/questionsData';
import { Award, BookOpen, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AboutRegulations: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-red-700" />
          Quy Chế Sát Hạch Lý Thuyết Lái Xe Cơ Giới Đường Bộ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Quy định ban hành bởi Cục Cảnh sát Giao thông - Bộ Công An áp dụng cho các cơ sở sát hạch trên toàn quốc.
        </p>
      </div>

      {/* 600 Questions Structure Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          Cấu trúc Bộ 600 Câu Hỏi (Phân bổ 6 Chương)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHAPTER_LIST.map(ch => (
            <div key={ch.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">
                  Chương {ch.id}: {ch.title.split(': ')[1] || ch.title}
                </span>
                <span className="text-xs font-mono font-bold bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                  {ch.count} câu
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {ch.description}
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                {ch.rangeText} · {ch.seriousCount > 0 ? `${ch.seriousCount} câu điểm liệt` : 'Không có câu điểm liệt'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* License Ranks Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Bảng Điểm Chuẩn & Thời Gian Thi Theo Hạng GPLX
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="p-3">Hạng GPLX</th>
                <th className="p-3">Số câu hỏi</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Điểm chuẩn đạt</th>
                <th className="p-3">Câu điểm liệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.entries(LICENSE_CONFIGS).map(([rank, cfg]) => (
                <tr key={rank} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 font-mono">Hạng {rank}</td>
                  <td className="p-3 font-mono">{cfg.totalQuestions} câu</td>
                  <td className="p-3 font-mono">{cfg.durationMinutes} phút</td>
                  <td className="p-3 font-mono font-bold text-emerald-700">≥ {cfg.passScore}/{cfg.totalQuestions} câu</td>
                  <td className="p-3 text-red-600 font-medium">Bắt buộc đúng 100%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crucial serious rule */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-950 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-red-800">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          QUY TẮC BẮT BUỘC ĐỐI VỚI CÂU HỎI ĐIỂM LIỆT
        </div>
        <p className="text-xs leading-relaxed text-red-900">
          Trong đề thi sát hạch lý thuyết, hệ thống sẽ tự động bốc ngẫu nhiên ít nhất <strong>01 câu hỏi điểm liệt</strong> (thuộc nhóm 60 tình huống mất an toàn giao thông nghiêm trọng). Nếu thí sinh làm sai bất kỳ câu hỏi nào trong nhóm này thì <strong>toàn bộ bài thi bị đánh giá là KHÔNG ĐẠT (TRƯỢT)</strong> ngay cả khi đạt 29/30 câu.
        </p>
      </div>
    </div>
  );
};
