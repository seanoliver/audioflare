import { toast } from 'react-hot-toast';
import { isLongerThan30Seconds } from './utils';

export const processFiles = (files: FileList | null): File | undefined => {
	if (!files) return;

	const audioFiles = Array.from(files).filter(file =>
		file.type.startsWith('audio/')
	);

	if (audioFiles.length === 0) {
		toast('No audio files detected.', {
			icon: '⚠️',
		});

		return;
	} else {
		const audio = document.createElement('audio');
		if (isLongerThan30Seconds(audio)) {
			toast('Only the first 30 seconds of your clip will be transcribed.', {
				icon: '⚠️',
			});
		}
		audio.src = URL.createObjectURL(audioFiles[0]);
	}
	return audioFiles[0];
};

export const fetchTranscript = async (audio: File) => {
	const formData = new FormData();
	formData.append('file', audio);
	const response = await fetch('/api/transcribe', {
		method: 'POST',
		body: formData,
	});
	const result = await response.json();
  return result.result.text;
};
