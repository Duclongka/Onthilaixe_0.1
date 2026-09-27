import React from 'react';
import { QuestionImageItem } from '../types';
import { getTrafficSignSvg, getScenarioSvg } from '../data/svgDiagrams';

interface SvgVisualProps {
  imageKey?: string;
  images?: QuestionImageItem[];
  className?: string;
}

export const SvgVisual: React.FC<SvgVisualProps> = ({ imageKey, images, className = '' }) => {
  // Normalize items
  let items: QuestionImageItem[] = [];

  if (images && images.length > 0) {
    items = images;
  } else if (imageKey) {
    // Check if imageKey is JSON string
    if (imageKey.startsWith('[') && imageKey.endsWith(']')) {
      try {
        items = JSON.parse(imageKey);
      } catch {
        items = [{ key: imageKey }];
      }
    } else {
      items = [{ key: imageKey }];
    }
  }

  if (items.length === 0) return null;

  // Single scenario diagram (e.g. sa hình with full intersection)
  if (items.length === 1 && items[0].key.startsWith('sahinh_')) {
    const svgHtml = getScenarioSvg(items[0].key);
    return (
      <div className={`my-4 flex flex-col items-center ${className}`}>
        <div
          className="w-full max-w-lg bg-slate-800 rounded-xl overflow-hidden shadow-sm"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
        {items[0].label && (
          <span className="text-xs font-semibold text-slate-600 mt-2">
            {items[0].label}
          </span>
        )}
      </div>
    );
  }

  // Multi-image display (e.g. 2 or 3 traffic signs side by side: Biển 1, Biển 2, Biển 3)
  return (
    <div className={`my-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {items.map((item, idx) => {
          let svgHtml = '';
          if (item.key.startsWith('sahinh_')) {
            svgHtml = getScenarioSvg(item.key);
          } else {
            svgHtml = getTrafficSignSvg(item.key, item.label);
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: svgHtml }}
              />
              {item.label && (
                <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono tracking-wide px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
