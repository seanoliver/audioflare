import { create } from 'zustand';

interface Store {
  transcript: string;
  file: File | null;
  loading: boolean;
  submitted: boolean;
  setTranscript: (transcript: string) => void;
  setFile: (file: File | null) => void;
  setLoading: (loading: boolean) => void;
  setSubmitted: (submitted: boolean) => void;
  clear: () => void;
}

export const useStore = create<Store>((set) => ({
  transcript: '',
  file: null,
  loading: false,
  submitted: false,
  setTranscript: (transcript: string) => set({ transcript }),
  setFile: (file: File | null) => set({ file }),
  setLoading: (loading: boolean) => set({ loading }),
  setSubmitted: (submitted: boolean) => set({ submitted }),
  clear: () => set({ transcript: '', file: null, loading: false, submitted: false }),
}));