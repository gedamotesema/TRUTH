export type StepType = 'narrative' | 'dialogue' | 'question' | 'revelation' | 'scripture' | 'logic' | 'debate' | 'quote' | 'analysis' | 'reflection';

export interface Reference {
  book?: string;
  chapter?: string;
  verse?: string;
  author?: string;
  work?: string;
  source?: string;
}

export interface DebateSide {
  name: string;
  argument: string;
  avatar?: string; // Icon or image reference
}

export interface QuoteData {
  text: string;
  author: string;
  title?: string; // e.g., "Bishop of Hippo"
  source?: string; // e.g., "Confessions, Book X"
  year?: string;
}

export interface AnalysisStep {
  premise1: string;
  premise2: string;
  conclusion: string;
  analysis: string; // Detailed breakdown
}

export interface ChoiceOption {
  label: string;
  text: string;
  jumpTo?: string; // Optional step ID to jump to
}

export interface ReflectionData {
  question: string;
  options: ChoiceOption[];
}

export interface VisualMetadata {
  background?: string;
  animation?: string;
  focus?: string;
  effect?: string;
  icon?: string;
}

export interface Step {
  id: string;
  type: StepType;
  content: string; // For narrative, dialogue, question, logic. For others, this might be a summary or fallback.
  speaker?: string;
  visuals?: VisualMetadata;
  metadata?: Record<string, any>;

  // New specific fields (optional)
  reference?: Reference;
  debate?: {
    sideA: DebateSide;
    sideB: DebateSide;
    winner?: 'A' | 'B' | 'none'; // logic might dictate a winner
    summary?: string;
  };
  quote?: QuoteData;
  analysis?: AnalysisStep;
  reflection?: ReflectionData;
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  slug: string;
  theme?: string;
  bg_audio?: string;
  steps: Step[];
}

export interface Act {
  id: string;
  title: string;
  order: number;
  description: string;
  chapters: Chapter[];
}
