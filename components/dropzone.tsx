import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({
	setTranscript,
}: {
	setTranscript: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: acceptedFiles => {
			setFile(acceptedFiles[0]);
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
		}
	};

	const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			setLoading(true);
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
		<form onSubmit={handleFileSubmit} className='w-full h-full'>
			<div
				{...getRootProps()}
				className='h-full flex flex-col justify-center'>
				<input {...getInputProps()} />
				<p className='flex justify-center text-slate-500 items-center text-xs h-full w-full border-2 rounded-md border-dashed border-slate-700'>
					Drag and drop an audio file here, or click to select one.
				</p>
			</div>
		</form>
	);
}
