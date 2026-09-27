import React, { useState } from 'react';
import { CandidateInfo, LicenseRank } from '../types';
import { LICENSE_CONFIGS } from '../data/questionsData';
import { examApi } from '../services/examService';
import { UserCheck, Play, Sparkles, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

interface CandidateLoginProps {
  selectedRank: LicenseRank;
  onSelectRank: (rank: LicenseRank) => void;
  candidate: CandidateInfo | null;
  onVerifyCandidate: (candidateData: CandidateInfo) => void;
  onStartExam: (mode: 'full' | 'serious' | 'chapter', chapterId?: number) => void;
}

export const CandidateLogin: React.FC<CandidateLoginProps> = ({
  selectedRank,
  onSelectRank,
  candidate,
  onVerifyCandidate,
  onStartExam
}) => {
  const [unit, setUnit] = useState('Trung tâm Sát hạch Lái xe CSGT');
  const [course, setCourse] = useState('Khóa K72/2026');
  const [sbd, setSbd] = useState('08');
  const [examMode, setExamMode] = useState<'full' | 'serious'>('full');
  const [isVerifying, setIsVerifying] = useState(false);

  const config = LICENSE_CONFIGS[selectedRank] || LICENSE_CONFIGS.B;

  const handleCheckCandidate = async () => {
    setIsVerifying(true);
    try {
      const data = await examApi.simulateCandidate(unit, course, sbd, selectedRank);
      onVerifyCandidate(data);
    } catch {
      const fallback = await examApi.simulateCandidate(unit, course, sbd, selectedRank);
      onVerifyCandidate(fallback);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Official Header Banner */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest font-semibold text-red-700 mb-1">
          BỘ CÔNG AN · CỤC CẢNH SÁT GIAO THÔNG
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          HỆ THỐNG SÁT HẠCH LÝ THUYẾT LÁI XE CƠ GIỚI ĐƯỜNG BỘ
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
          Bộ đề chuẩn 600 câu hỏi mới nhất theo Luật Trật tự, an toàn giao thông đường bộ. Mô phỏng chính xác giao diện phòng thi sát hạch toàn quốc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Mode (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                1. Thông tin đăng ký dự sát hạch
              </h2>
              <span className="text-xs text-slate-400">Bước 1: Xác nhận thí sinh</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Đơn vị đào tạo / Sát hạch
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="Nhập tên trung tâm sát hạch..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Khóa thi sát hạch
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Khóa thi..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Số báo danh (SBD)
                </label>
                <input
                  type="text"
                  value={sbd}
                  onChange={(e) => setSbd(e.target.value)}
                  placeholder="Nhập SBD..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Hạng giấy phép lái xe (GPLX)
                </label>
                <select
                  value={selectedRank}
                  onChange={(e) => onSelectRank(e.target.value as LicenseRank)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
                >
                  {Object.entries(LICENSE_CONFIGS).map(([rank, cfg]) => (
                    <option key={rank} value={rank}>
                      Hạng {rank} - {cfg.name} ({cfg.totalQuestions} câu / {cfg.durationMinutes} phút)
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Check Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCheckCandidate}
                disabled={isVerifying}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors shadow-xs active:scale-[0.99] disabled:opacity-70"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                {isVerifying ? 'Đang truy xuất thông tin...' : 'Kiểm tra thông tin thí sinh'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSbd(String(Math.floor(1 + Math.random() * 99)).padStart(2, '0'));
                  handleCheckCandidate();
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                title="Tạo ngẫu nhiên một thí sinh mới"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Sinh ngẫu nhiên
              </button>
            </div>
          </div>

          {/* Exam Mode Selection */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              2. Chọn chế độ làm bài
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setExamMode('full')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  examMode === 'full'
                    ? 'border-red-600 bg-red-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-slate-900">Thi thử chuẩn quy chế</span>
                  <span className="text-xs font-mono text-red-700 font-bold bg-white px-2 py-0.5 rounded border border-red-200">
                    {config.totalQuestions} câu · {config.durationMinutes}p
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ngẫu nhiên theo tỷ lệ 6 chương, có bắt buộc 1 câu điểm liệt. Yêu cầu đạt ≥ {config.passScore}/{config.totalQuestions} điểm.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setExamMode('serious')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  examMode === 'serious'
                    ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Chuyên đề 60 điểm liệt
                  </span>
                  <span className="text-xs font-mono text-amber-700 font-bold bg-white px-2 py-0.5 rounded border border-amber-200">
                    Bắt buộc
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tập trung luyện các tình huống mất an toàn giao thông nghiêm trọng mà nếu sai sẽ bị đánh giá trượt ngay.
                </p>
              </button>
            </div>

            {/* Launch Action */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onStartExam(examMode)}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold text-base py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                <Play className="w-5 h-5 fill-current" />
                Ôn luyện / Vào thi ngay
              </button>
              {!candidate && (
                <p className="text-xs text-center text-slate-400 mt-2">
                  * Bạn có thể bấm "Kiểm tra thông tin thí sinh" trước hoặc vào làm bài trực tiếp.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Card & Exam Rules (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official Candidate Badge Card */}
          <div className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden shadow-xs relative">
            <div className="bg-red-700 text-white px-4 py-2.5 text-center">
              <p className="text-xs font-semibold tracking-wider uppercase">PHIẾU THÔNG TIN THÍ SINH DỰ THI</p>
              <p className="text-[11px] text-red-100">KỲ SÁT HẠCH LÝ THUYẾT LÁI XE CƠ GIỚI</p>
            </div>

            <div className="p-5">
              {candidate ? (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    {/* Candidate Photo Box */}
                    <div className="relative w-24 h-32 rounded border border-slate-300 bg-slate-100 shrink-0 overflow-hidden flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-lg mb-1">
                        {candidate.fullName.slice(0, 1)}
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">3x4 CM</span>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border border-red-500/40 bg-red-50 flex items-center justify-center text-[7px] font-bold text-red-600 rotate-[-15deg]">
                        ĐÃ KIỂM TRA
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-1.5 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Họ và tên thí sinh</span>
                        <span className="text-slate-900 font-bold text-sm uppercase">{candidate.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Số báo danh (SBD)</span>
                        <span className="text-red-700 font-mono font-bold text-base">{candidate.sbd}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Hạng sát hạch</span>
                        <span className="text-slate-900 font-semibold">Hạng {candidate.licenseRank}</span>
                      </div>
                    </div>
                  </div>

                  {/* Extended candidate metadata */}
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ngày sinh:</span>
                      <span className="font-medium text-slate-800">{candidate.dob}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Số CCCD:</span>
                      <span className="font-mono font-medium text-slate-800">{candidate.cccd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Đơn vị:</span>
                      <span className="font-medium text-slate-800 text-right">{candidate.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Khóa thi:</span>
                      <span className="font-medium text-slate-800">{candidate.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Địa chỉ:</span>
                      <span className="font-medium text-slate-800 text-right truncate max-w-[200px]" title={candidate.address}>
                        {candidate.address}
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dữ liệu hợp lệ, sẵn sàng kết nối vào hệ thống chấm thi tự động.</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-20 mx-auto rounded border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <UserCheck className="w-8 h-8 opacity-40" />
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Chưa có thông tin thí sinh. Vui lòng bấm nút <strong>"Kiểm tra thông tin thí sinh"</strong> để mô phỏng hồ sơ phòng thi.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quy chế thi sát hạch */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 text-xs space-y-3 text-slate-700">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-700" />
              Quy chế thi sát hạch Hạng {selectedRank}
            </h3>
            <ul className="space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">·</span>
                <span>Tổng số câu hỏi: <strong>{config.totalQuestions} câu</strong>. Thời gian: <strong>{config.durationMinutes} phút</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">·</span>
                <span>Điểm đạt yêu cầu: <strong>{config.passScore}/{config.totalQuestions} câu đúng</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">·</span>
                <span>
                  <strong>Đặc biệt lưu ý câu điểm liệt:</strong> Trả lời sai bất kỳ câu hỏi nào thuộc nhóm tình huống mất an toàn giao thông nghiêm trọng thì toàn bộ bài thi bị đánh giá là <strong>KHÔNG ĐẠT (TRƯỢT)</strong> dù tổng điểm đạt yêu cầu!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
