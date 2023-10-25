'use client';

import { useEffect, useState } from 'react';
import { fetchTranscript, processFiles } from '../lib/actions';
import { useStore } from '../lib/store';
import DropzoneEmpty from '../components/dropzone-empty';
import DropzoneFull from '../components/dropzone-full';
import { useRouter } from 'next/navigation';

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

	const router = useRouter();

	const pacinoURL = './audio/Al Pacino - Any Given Sunday.aac';
	const croweURL = './audio/Russell Crowe - Gladiator.aac';
	const trumpURL = './audio/Donald Trump 2016 Speech.aac';

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setInDrag(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setInDrag(false);
	};

	const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files;
		const audioFile = processFiles(files);
		if (audioFile) setFile(audioFile);
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setInDrag(false);

    		// Handle drag-and-drop of predefined options
		const data = e.dataTransfer.getData('text');

		let fileURL;

		if (data === 'pacino') {
			fileURL = pacinoURL;
		} else if (data === 'crowe') {
			fileURL = croweURL;
		} else if (data === 'trump') {
			fileURL = trumpURL;
		}

    if (!fileURL) return;

    const path = fileURL;
    const segments = path.split('/');
    const filename = segments[segments.length - 1];

		if (fileURL) {
			const response = await fetch(fileURL);
			const blob = await response.blob();
			const file = new File([blob], filename, { type: 'audio/aac' });
			setFile(file);
      return;
		}


		// Handle file drop
		const files = e.dataTransfer.files;
		const audioFile = processFiles(files);
		if (audioFile) {
			setFile(audioFile);
		}
	};

	const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>) => {
		e.dataTransfer.setData(
			'text',
			e.currentTarget.getAttribute('data-file') || ''
		);
	};

	const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    console.log('submit fired', e)
		if (file) {
			setLoading(true);
			setSubmitted(true);
			fetchTranscript(file)
				.then(fetchedTranscript => {
					setTranscript(fetchedTranscript);
				})
				.catch(error => {
					console.error(error);
				});
			router.push('/results');
		}
	};

  useEffect(() => {
		if (!file) router.push('/');
	}, [file, router]);

	return (
		<div className='flex flex-col w-full justify-center items-center'>
			<form
				onSubmit={handleFileSubmit}
				className='w-3/5 h-2/5'>
				{file ? (
					<DropzoneFull file={file} />
				) : (
					<DropzoneEmpty
						handleFileSelected={handleFileSelected}
						handleDragOver={handleDragOver}
						handleDragLeave={handleDragLeave}
						handleDrop={handleDrop}
						handleDragStart={handleDragStart}
						inDrag={inDrag}
						pacino={pacinoURL}
						crowe={croweURL}
						trump={trumpURL}
					/>
				)}
			</form>
		</div>
	);
}
