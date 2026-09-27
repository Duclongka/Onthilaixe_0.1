import React from 'react';
import { LicenseRank } from '../types';
import { LICENSE_CONFIGS } from '../data/questionsData';

interface NavbarProps {
  currentTab: 'exam' | 'serious' | 'chapters' | 'about';
  onSelectTab: (tab: 'exam' | 'serious' | 'chapters' | 'about') => void;
  selectedRank: LicenseRank;
  onSelectRank: (rank: LicenseRank) => void;
  isExamInProgress?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedRank,
  onSelectRank,
  isExamInProgress = false
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand wordmark (single text element) */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-red-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            CSGT
          </div>
          <button
            onClick={() => !isExamInProgress && onSelectTab('exam')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 text-left hover:text-red-700 transition-colors"
          >
            Sát Hạch Lái Xe 600 Câu
          </button>
        </div>

        {/* Zone 2: 4 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => !isExamInProgress && onSelectTab('exam')}
            disabled={isExamInProgress}
            className={`transition-colors py-1 ${
              currentTab === 'exam'
                ? 'text-red-700 font-semibold border-b-2 border-red-700'
                : 'hover:text-slate-900'
            } ${isExamInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            Phòng thi sát hạch
          </button>

          <button
            onClick={() => !isExamInProgress && onSelectTab('serious')}
            disabled={isExamInProgress}
            className={`transition-colors py-1 ${
              currentTab === 'serious'
                ? 'text-red-700 font-semibold border-b-2 border-red-700'
                : 'hover:text-slate-900'
            } ${isExamInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            60 Câu điểm liệt
          </button>

          <button
            onClick={() => !isExamInProgress && onSelectTab('chapters')}
            disabled={isExamInProgress}
            className={`transition-colors py-1 ${
              currentTab === 'chapters'
                ? 'text-red-700 font-semibold border-b-2 border-red-700'
                : 'hover:text-slate-900'
            } ${isExamInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            Ôn luyện 6 Chương
          </button>

          <button
            onClick={() => !isExamInProgress && onSelectTab('about')}
            disabled={isExamInProgress}
            className={`transition-colors py-1 ${
              currentTab === 'about'
                ? 'text-red-700 font-semibold border-b-2 border-red-700'
                : 'hover:text-slate-900'
            } ${isExamInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            Quy chế & Hướng dẫn
          </button>
        </nav>

        {/* Zone 3: Primary Action & Rank selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="rank-select" className="text-xs text-slate-500 font-medium hidden sm:inline">
              Hạng GPLX:
            </label>
            <select
              id="rank-select"
              value={selectedRank}
              disabled={isExamInProgress}
              onChange={(e) => onSelectRank(e.target.value as LicenseRank)}
              className="bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-600 disabled:opacity-60"
            >
              {Object.keys(LICENSE_CONFIGS).map((rank) => (
                <option key={rank} value={rank}>
                  Hạng {rank}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
