import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { DotFilledIcon } from '@radix-ui/react-icons';

export default function Recorder() {
	const [audioURL, setAudioURL] = useState('');
	const [isRecording, setIsRecording] = useState(false);
	let mediaRecorder = useRef<MediaRecorder | null>(null);

	const startRecording = () => {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			mediaRecorder.current = new MediaRecorder(stream);
			mediaRecorder.current.start();

			const audioChunks: Blob[] = [];
			mediaRecorder.current.addEventListener('dataavailable', event => {
				audioChunks.push(event.data);
			});

			mediaRecorder.current.addEventListener('stop', () => {
				const audioBlob = new Blob(audioChunks);
				const audioUrl = URL.createObjectURL(audioBlob);
				const audio = new Audio(audioUrl);
        console.log('audio', audio, typeof audio)
				audio.play();
				setAudioURL(audioUrl);
			});

			setIsRecording(true);
		});
	};

	const stopRecording = () => {
		if (mediaRecorder.current) {
			mediaRecorder.current.stop();
			setIsRecording(false);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center'>
			{isRecording ? (
				<Button onClick={stopRecording}>
					<DotFilledIcon className='text-red-500 w-7 h-7 animate-pulse' /> Stop
					Recording
				</Button>
			) : (
				<Button onClick={startRecording}>
					<DotFilledIcon className='text-red-500 w-7 h-7' /> Start Recording
				</Button>
			)}
			{audioURL && (
				<>
					<audio
						src={audioURL}
						controls>
						Your browser does not support the audio element.
					</audio>
					<Button>Transcribe</Button>
				</>
			)}
		</div>
	);
}
