import {
  CopyIcon,
  Cross2Icon
} from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../lib/store';
import { SentimentType, TranscriptButtonsType } from '../lib/types';
import { convertBytes } from '../lib/utils';
import { ActionButtons } from './action-buttons';
import { LoadingCard } from './loading-card';
import { StyledCard } from './styled-card';

export default function Results() {
	const {
		file,
		summary,
		transcript,
		loading,
		sentiment,
		translation,
		setLoading,
		setSummary,
		setSentiment,
		setTranslation,
		clear,
	} = useStore(state => {
		return {
			file: state.file,
			summary: state.summary,
			transcript: state.transcript,
			loading: state.loading,
			translation: state.translation,
			sentiment: state.sentiment,
			setLoading: state.setLoading,
			setSummary: state.setSummary,
			setTranslation: state.setTranslation,
			setSentiment: state.setSentiment,
			clear: state.clear,
		};
	});

	const handleCopy = async () => {
		if (!file) return;
		const content = `Transcript of ${file.name} (${convertBytes(
			file.size
		)})\n\n${transcript}\n\nSummary\n\n${summary}`;
		await navigator.clipboard.writeText(transcript);
		toast.success('Copied to clipboard!');
	};

	const transcriptButtons: TranscriptButtonsType = [
		{
			name: 'Copy',
			icon: <CopyIcon />,
			variant: 'default',
			className:
				'bg-slate-700 text-xs text-slate-100 px-4 py-1 rounded-md m-2 flex gap-2',
			onClick: handleCopy,
		},
		{
			name: 'Clear',
			icon: <Cross2Icon />,
			variant: 'destructive',
			className:
				'bg-slate-700 text-xs text-slate-100 px-4 py-1 rounded-md m-2 flex gap-2',
			onClick: clear,
		},
	];

	const transcriptHeader =
		file !== null
			? `Transcript of ${file.name} (${convertBytes(file.size)})`
			: 'Transcript';

	useEffect(() => {
		const fetchSummary = async () => {
			if (file && loading) {
				const formData = new FormData();
				formData.append('text', transcript);
				const response = await fetch('/api/summarize', {
					method: 'POST',
					body: formData,
				});
				const result = await response.json();
				console.log('result', result);
				setSummary(result.result.response);
				setLoading(false);
			}
		};

		if (transcript) fetchSummary();
	}, [transcript]);

	useEffect(() => {
		const fetchSentiment = async () => {
			if (transcript && loading) {
				const formData = new FormData();
				formData.append('text', transcript);
				const response = await fetch('/api/sentiment', {
					method: 'POST',
					body: formData,
				});
				const sentimentResponse: SentimentType = [];
				const result = await response.json();
				result?.result?.map((item: any) => sentimentResponse.push(item));
				setSentiment(sentimentResponse);
				setLoading(false);
			}
		};
		fetchSentiment();
	}, [transcript]);

	useEffect(() => {
		const fetchTranslation = async () => {
			if (transcript && loading) {
				const formData = new FormData();
				formData.append('text', transcript);
				const response = await fetch('/api/translate', {
					method: 'POST',
					body: formData,
				});
				const result = await response.json();
				setTranslation(result.result.translated_text);
				setLoading(false);
			}
		};
		fetchTranslation();
	}, [transcript]);

	return (
		<div className='w-4/6'>
			{transcript ? (
				<StyledCard
					header={transcriptHeader}
					model='OpenAI Whisper'
					content={transcript}
				/>
			) : (
				<LoadingCard />
			)}
			{summary ? (
				<StyledCard
					header='Summary'
					model='Meta Llama 2 7b'
					content={summary}
				/>
			) : (
				<LoadingCard />
			)}
			{sentiment.length > 0 ? (
				<StyledCard
					header='Sentiment'
					model='Quantized DistilBERT'
					content={sentiment}
				/>
			) : (
				<LoadingCard />
			)}
			{translation ? (
				<StyledCard
					header='Translation'
					model='M2M100'
					content={translation}
				/>
			) : (
				<LoadingCard />
			)}
			{transcript && summary && (
				<ActionButtons transcriptButtons={transcriptButtons} />
			)}
		</div>
	);
}
