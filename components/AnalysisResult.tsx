import React from 'react';
import { WasteCategory, ClassificationResult } from '../types';
import { 
  TriangleAlert, 
  Recycle, 
  Trash2, 
  Leaf, 
  RefreshCcw, 
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

interface AnalysisResultProps {
  result: ClassificationResult;
  imageSrc: string;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, imageSrc, onReset }) => {
  const getCategoryStyles = (category: WasteCategory) => {
    switch (category) {
      case WasteCategory.HAZARD:
        return {
          bg: 'bg-red-600',
          border: 'border-red-500',
          text: 'text-white',
          title: 'HAZARD',
          icon: <AlertOctagon className="w-24 h-24 lg:w-32 lg:h-32 mb-4" />,
          description: 'Dispose in Special Hazard Bin',
          subColor: 'bg-red-800'
        };
      case WasteCategory.COMPOST:
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-400',
          text: 'text-black',
          title: 'COMPOST',
          icon: <Leaf className="w-24 h-24 lg:w-32 lg:h-32 mb-4" />,
          description: 'Dispose in Compost/Organic Bin',
          subColor: 'bg-yellow-600'
        };
      case WasteCategory.RECYCLE:
        return {
          bg: 'bg-green-600',
          border: 'border-green-500',
          text: 'text-white',
          title: 'RECYCLE',
          icon: <Recycle className="w-24 h-24 lg:w-32 lg:h-32 mb-4" />,
          description: 'Dispose in Recycling Bin',
          subColor: 'bg-green-800'
        };
      case WasteCategory.TRASH:
      default:
        return {
          bg: 'bg-slate-600',
          border: 'border-slate-500',
          text: 'text-white',
          title: 'TRASH',
          icon: <Trash2 className="w-24 h-24 lg:w-32 lg:h-32 mb-4" />,
          description: 'Dispose in General Waste Bin',
          subColor: 'bg-slate-800'
        };
    }
  };

  const styles = getCategoryStyles(result.category);

  return (
    <div className={`h-full w-full flex flex-col lg:flex-row ${styles.bg} ${styles.text} animate-in fade-in zoom-in duration-300`}>
      {/* Header Result Section (Top on mobile, Left on desktop) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[40%] lg:h-full">
        <div className="animate-bounce-short">
          {styles.icon}
        </div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-2 uppercase drop-shadow-md">
          {styles.title}
        </h1>
        <p className="text-lg lg:text-2xl font-medium opacity-90 uppercase tracking-widest border-t-2 border-current pt-2 mt-2">
          {styles.description}
        </p>
      </div>

      {/* Details Card Section (Bottom sheet on mobile, Right sidebar on desktop) */}
      <div className="bg-white text-slate-900 rounded-t-3xl lg:rounded-tr-none lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-br-none p-6 lg:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] lg:shadow-[-20px_0_60px_rgba(0,0,0,0.3)] flex flex-col lg:w-1/2 xl:w-[550px] lg:h-full overflow-y-auto z-10">
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-start gap-4 lg:flex-col lg:items-center mb-6 lg:mb-10">
            {/* Image Preview */}
            <div className="w-24 h-24 lg:w-64 lg:h-64 rounded-xl overflow-hidden shadow-lg border-2 border-slate-100 shrink-0 bg-slate-200">
              <img 
                src={imageSrc} 
                alt="Analyzed Item" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Text Details */}
            <div className="flex-1 lg:text-center lg:w-full mt-2 lg:mt-6">
              <h2 className="text-2xl lg:text-4xl font-bold mb-2 leading-tight">{result.itemName}</h2>
              
              <div className="flex items-center gap-2 mb-4 lg:justify-center">
                <span className={`px-3 py-1 rounded-md text-sm lg:text-base font-bold uppercase ${styles.bg} ${styles.text === 'text-black' ? 'text-black/80' : 'text-white'}`}>
                  {result.category}
                </span>
                <span className="text-sm lg:text-base text-slate-500 font-mono">
                  CONFIDENCE: {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>
              
              <p className="text-sm lg:text-lg text-slate-600 leading-relaxed max-w-prose mx-auto">
                {result.reasoning}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onReset}
          className={`w-full py-4 lg:py-6 rounded-2xl text-xl lg:text-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all hover:-translate-y-1 ${styles.bg} ${styles.text} hover:brightness-110 mt-auto`}
        >
          <RefreshCcw className="w-6 h-6 lg:w-8 lg:h-8" />
          SCAN NEXT ITEM
        </button>
      </div>
    </div>
  );
};