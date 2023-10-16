import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../lib/store';
import DropzoneEmpty from './dropzone-empty';
import DropzoneFull from './dropzone-full';

export default function Dropzone() {
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

	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			accept: {
				'audio/*': ['.mp3', '.wav', '.ogg', '.flac', '.m4a'],
			},
			onDrop: acceptedFiles => {
				console.log('drop', acceptedFiles);
			},
			onDropAccepted: acceptedFiles => {
				console.log('drop accepted', acceptedFiles);
			},
			onDropRejected: () => {
				console.log('drop rejected');
			},
			multiple: false,
		});

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

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	}, [acceptedFiles, setFile]);

	useEffect(() => {
		if (transcript) {
			setLoading(false);
		}
	}, [setLoading, transcript]);

	return (
		<form
			onSubmit={handleFileSubmit}
			className='w-full h-full'>
			{file ? (
				<DropzoneFull file={file} />
			) : (
				<DropzoneEmpty
					getRootProps={getRootProps}
					getInputProps={getInputProps}
					isDragActive={isDragActive}
				/>
			)}
		</form>
	);
}
