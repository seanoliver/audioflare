import { useState } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../lib/store';
import { isLongerThan30Seconds } from '../lib/utils';
import DropzoneEmpty from './dropzone-empty';
import DropzoneFull from './dropzone-full';
import { processFiles, fetchTranscript } from '../lib/actions';

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setInDrag(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setInDrag(false);
  }

	const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files;
		const audioFile = processFiles(files);
    if (audioFile) setFile(audioFile)
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setInDrag(false);
		const files = e.dataTransfer.files;
		const audioFile = processFiles(files);
    if (audioFile) setFile(audioFile)
	};

	const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
      setLoading(true);
			setSubmitted(true);
			const fetchedTranscript = await fetchTranscript(file);
			setTranscript(fetchedTranscript);
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
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
					inDrag={inDrag}
				/>
			)}
		</form>
	);
}
