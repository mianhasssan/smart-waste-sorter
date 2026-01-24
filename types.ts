export enum WasteCategory {
  HAZARD = 'HAZARD',
  COMPOST = 'COMPOST',
  RECYCLE = 'RECYCLE',
  TRASH = 'TRASH',
}

export interface ClassificationResult {
  category: WasteCategory;
  itemName: string;
  reasoning: string;
  confidence: number;
}

export interface AnalysisState {
  status: 'idle' | 'scanning' | 'analyzing' | 'complete' | 'error';
  result?: ClassificationResult;
  error?: string;
  imageSrc?: string;
}
