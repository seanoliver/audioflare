import { create } from 'zustand';
import { SentimentType, TargetLanguage, TranslationInterface, ResponseWithTime } from './types';
import { CLOUDFLARE_TRANSLATION_LANGUAGES } from './constants';

interface Store {
	transcript: ResponseWithTime;
	file: File | null;
	summary: ResponseWithTime;
	loading: boolean;
	submitted: boolean;
	sentiment: SentimentType;
	translations: TranslationInterface;
	setTranscript: (transcript: ResponseWithTime) => void;
	setFile: (file: File | null) => void;
	setLoading: (loading: boolean) => void;
	setSummary: (summary: ResponseWithTime) => void;
	setSubmitted: (submitted: boolean) => void;
	setSentiment: (sentiment: SentimentType) => void;
	setTranslations: (language: TargetLanguage, text: string, timeTaken: number) => void;
	clear: () => void;
}

const initialTranslations = (): TranslationInterface => {
	const translations: TranslationInterface = {};
	for (const language of CLOUDFLARE_TRANSLATION_LANGUAGES) {
		translations[language] = {text: '', timeTaken: 0};
	}
	return translations;
};

const initialResponse = (): ResponseWithTime => {
  return { text: '', timeTaken: 0 };
}

const initialState = {
	transcript: initialResponse(),
	summary: initialResponse(),
	file: null,
	loading: false,
	submitted: false,
	sentiment: [] as SentimentType,
	translations: initialTranslations(),
};

export const useStore = create<Store>(set => ({
	...initialState,
	setTranscript: (transcript: ResponseWithTime) => set({ transcript }),
	setFile: (file: File | null) => set({ file }),
	setLoading: (loading: boolean) => set({ loading }),
	setSubmitted: (submitted: boolean) => set({ submitted }),
	setSummary: (summary: ResponseWithTime) => set({ summary }),
	setSentiment: (sentiment: SentimentType) => set({ sentiment }),
	setTranslations: (language: TargetLanguage, text: string, timeTaken: number) => {
		set(state => ({
			...state,
			translations: {
				...state.translations,
				[language]: {
          text,
          timeTaken,
        },
			},
		}));
	},
	clear: () => set(initialState),
}));