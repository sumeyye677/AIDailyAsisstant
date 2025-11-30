export interface Entry {
  id: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
  suggestion: string;
  date: string;
  score: number;
}

export interface AnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
  suggestion: string;
  score: number;
}
