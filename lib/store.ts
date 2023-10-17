import { create } from 'zustand';

interface Store {
  transcript: string;
  file: File | null;
  summary: string;
  loading: boolean;
  submitted: boolean;
  setTranscript: (transcript: string) => void;
  setFile: (file: File | null) => void;
  setLoading: (loading: boolean) => void;
  setSummary: (summary: string) => void;
  setSubmitted: (submitted: boolean) => void;
  clear: () => void;
}

const initialState = {
  transcript: '',
  summary: '',
  file: null,
  loading: false,
  submitted: false,
}

export const useStore = create<Store>((set) => ({
  ...initialState,
  setTranscript: (transcript: string) => set({ transcript }),
  setFile: (file: File | null) => set({ file }),
  setLoading: (loading: boolean) => set({ loading }),
  setSubmitted: (submitted: boolean) => set({ submitted }),
  setSummary: (summary: string) => set({ summary }),
  clear: () => set({ ...initialState }),
}));