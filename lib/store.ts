import { create } from 'zustand';
import { SentimentType } from './types';

interface Store {
	transcript: string;
	file: File | null;
	summary: string;
	loading: boolean;
	submitted: boolean;
	sentiment: SentimentType;
  translation: string;
	setTranscript: (transcript: string) => void;
	setFile: (file: File | null) => void;
	setLoading: (loading: boolean) => void;
	setSummary: (summary: string) => void;
	setSubmitted: (submitted: boolean) => void;
	setSentiment: (sentiment: SentimentType) => void;
  setTranslation: (translation: string) => void;
	clear: () => void;
}

const initialState = {
	transcript: '',
	summary: '',
	file: null,
	loading: false,
	submitted: false,
	sentiment: [] as SentimentType,
  translation: '',
};

export const useStore = create<Store>(set => ({
	...initialState,
	setTranscript: (transcript: string) => set({ transcript }),
	setFile: (file: File | null) => set({ file }),
	setLoading: (loading: boolean) => set({ loading }),
	setSubmitted: (submitted: boolean) => set({ submitted }),
	setSummary: (summary: string) => set({ summary }),
	setSentiment: (sentiment: SentimentType) => set({ sentiment }),
  setTranslation: (translation: string) => set({ translation }),
	clear: () => set({ ...initialState }),
}));
