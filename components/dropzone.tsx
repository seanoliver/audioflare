import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../lib/store';
import DropzoneEmpty from './dropzone-empty';
import DropzoneFull from './dropzone-full';

export default function Dropzone() {
  const [inDrag, setInDrag] = useState(false);
	const { file, transcript, setFile, setLoading, setSubmitted, setTranscript } =
		useStore(state => {
			return {
				file: state.file,
				transcript: state.transcript,
				setFile: state.setFile,
				setLoading: state.setLoading,
				setSubmitted: state.setSubmitted,
				setTranscript: state.setTranscript,
			};
		});

	const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		processFiles(files);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setInDrag(false);
		const files = e.dataTransfer.files;
		processFiles(files);
	};

	const processFiles = (files: FileList | null) => {
		if (!files) return;

		const audioFiles = Array.from(files).filter(file => file.type.startsWith('audio/'))
		if (audioFiles.length === 0) {
			console.log('No audio files detected.');
			return;
		} else {
      setFile(audioFiles[0]);
    }
	};

	const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			setLoading(true);
			setSubmitted(true);
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch('/api/transcribe', {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();
			setTranscript(result.result.text);
		}
	};

	return (
		<form
			onSubmit={handleFileSubmit}
			className='w-3/5 h-2/5'>
			{file ? (
				<DropzoneFull file={file} />
			) : (
				<DropzoneEmpty
          handleFileSelected={handleFileSelected}
					inDrag={inDrag}
				/>
			)}
		</form>
	);
}
