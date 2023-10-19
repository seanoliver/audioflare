import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const convertBytes = (bytes: number) => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) {
		return '0 Byte';
	}
	const i = Math.floor(Math.log(bytes) / Math.log(1000));
	return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
};

export const isLongerThan30Seconds = (audio: HTMLAudioElement) => {
	return audio.onloadedmetadata = function () {
		if (audio.duration > 30) {
			return true;
		} else {
      return false;
    }
	};
};

export const extractAudioFile = (files: FileList) => {
  const audioFiles = Array.from(files).filter(file =>
    file.type.startsWith('audio/')
  );
  if (audioFiles.length === 0) {
    return null;
  } else {
    return audioFiles[0];
  }
}

export const belowFileSizeLimit = (file: File) => {
  if (file.size > 10000000) {
    return false;
  } else {
    return true;
  }
}