import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CLOUDFLARE_MODELS } from './constants';

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

export const getGatewayUrl = (model: keyof typeof CLOUDFLARE_MODELS) => {
  const {
    CLOUDFLARE_ACCOUNT_ID: accountId,
    CLOUDFLARE_AI_GATEWAY_ENDPOINT: gatewayEndpoint,
    CLOUDFLARE_AI_GATEWAY_URL_SLUG: gatewayUrlSlug,
    CLOUDFLARE_AI_GATEWAY_PROVIDER: gatewayProvider
  } = process.env;

  const cfModel = CLOUDFLARE_MODELS[model];


  return `${gatewayEndpoint}/${accountId}/${gatewayUrlSlug}/${gatewayProvider}/${cfModel}`
}

export const msToTime = (duration: number) => {
  const milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60);

  const secondsStr = (seconds < 10) ? seconds : seconds;

  return secondsStr + "." + milliseconds + " seconds";
}