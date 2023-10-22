import { create } from 'zustand';
import { SentimentType, TargetLanguage, TranslationInterface } from './types';
import { CLOUDFLARE_TRANSLATION_LANGUAGES } from './constants';

interface Store {
	transcript: string;
	file: File | null;
	summary: string;
	loading: boolean;
	submitted: boolean;
	sentiment: SentimentType;
	translations: TranslationInterface;
	setTranscript: (transcript: string) => void;
	setFile: (file: File | null) => void;
	setLoading: (loading: boolean) => void;
	setSummary: (summary: string) => void;
	setSubmitted: (submitted: boolean) => void;
	setSentiment: (sentiment: SentimentType) => void;
	setTranslations: (language: TargetLanguage, text: string) => void;
	clear: () => void;
}

const initialTranslations = (): TranslationInterface => {
	const translations: TranslationInterface = {};
	for (const language of CLOUDFLARE_TRANSLATION_LANGUAGES) {
		translations[language] = '';
	}
	return translations;
};

const initialState = {
	transcript: '',
	summary: '',
	file: null,
	loading: false,
	submitted: false,
	sentiment: [] as SentimentType,
	translations: initialTranslations(),
};

export const useStore = create<Store>(set => ({
	...initialState,
	setTranscript: (transcript: string) => set({ transcript }),
	setFile: (file: File | null) => set({ file }),
	setLoading: (loading: boolean) => set({ loading }),
	setSubmitted: (submitted: boolean) => set({ submitted }),
	setSummary: (summary: string) => set({ summary }),
	setSentiment: (sentiment: SentimentType) => set({ sentiment }),
	setTranslations: (language: TargetLanguage, text: string) => {
		const currentText = text;
		set(state => ({
			...state,
			translations: {
				...state.translations,
				[language]: currentText,
			},
		}));
	},
	clear: () => set({ ...initialState }),
}));