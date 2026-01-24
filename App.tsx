import React, { useState } from 'react';
import { CameraFeed } from './components/CameraFeed';
import { AnalysisResult } from './components/AnalysisResult';
import { classifyWasteImage } from './services/geminiService';
import { AnalysisState } from './types';
import { Loader2, Upload, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({ status: 'idle' });

  const handleCapture = async (base64Image: string) => {
    setState({ status: 'analyzing', imageSrc: base64Image });
    
    try {
      const result = await classifyWasteImage(base64Image);
      setState({ 
        status: 'complete', 
        result, 
        imageSrc: base64Image 
      });
    } catch (error) {
      console.error(error);
      setState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : "Analysis failed", 
        imageSrc: base64Image
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleCapture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScanner = () => {
    setState({ status: 'idle' });
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 relative overflow-hidden">
      {/* Top Bar - Only visible in idle/scanning mode to maximize screen space */}
      {state.status !== 'complete' && (
        <header className="absolute top-0 left-0 right-0 z-20 p-4 lg:p-6 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                <RecycleIcon className="text-white w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-white font-bold text-lg lg:text-xl tracking-tight">Eco-Sort Agent</span>
            </div>
            {state.status === 'idle' && (
               <label className="bg-white/10 backdrop-blur-md text-white p-2 lg:p-3 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <Upload className="w-5 h-5 lg:w-6 lg:h-6" />
               </label>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full">
        {state.status === 'idle' && (
          <CameraFeed onCapture={handleCapture} onError={(err) => setState({ status: 'error', error: err })} />
        )}

        {state.status === 'analyzing' && (
          <div className="absolute inset-0 z-30 bg-slate-900 flex flex-col items-center justify-center">
            {state.imageSrc && (
              <div className="absolute inset-0 opacity-20">
                <img src={state.imageSrc} alt="Processing" className="w-full h-full object-cover blur-sm" />
              </div>
            )}
            <div className="relative z-10 flex flex-col items-center p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Analyzing Waste...</h2>
              <p className="text-slate-400 text-sm text-center max-w-[200px]">Detecting materials and identifying hazards.</p>
            </div>
          </div>
        )}

        {state.status === 'complete' && state.result && state.imageSrc && (
          <AnalysisResult 
            result={state.result} 
            imageSrc={state.imageSrc} 
            onReset={resetScanner} 
          />
        )}

        {state.status === 'error' && (
          <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-900 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analysis Failed</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">{state.error || "Could not identify the item. Please try again."}</p>
            <button 
              onClick={resetScanner}
              className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// Simple Icon component for the header
const RecycleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
    <path d="m14 16-3 3 3 3" />
    <path d="M8.293 13.596 7.196 9.5 3.1 7c.879-.97 2.16-1.5 3.51-1.5h10.78a5.18 5.18 0 0 1 3.51 1.5l-4.096 2.5-1.11 4.096" />
    <path d="m14.7 10.7 3-3-3-3" />
    <path d="m9.3 10.7-3-3 3-3" />
  </svg>
);

export default App;