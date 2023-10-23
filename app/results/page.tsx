'use client';

import { CopyIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { LoadingCard } from '../../components/loading-card';
import ResultControls from '../../components/result-controls';
import { StyledCard } from '../../components/styled-card';
import { useStore } from '../../lib/store';
import {
  SentimentType,
  TranscriptButtonsType,
} from '../../lib/types';
import { convertBytes } from '../../lib/utils';

export default function Results() {
	const {
		file,
		summary,
		transcript,
		loading,
		sentiment,
		translations,
		setSummary,
		setSentiment,
		setTranslations,
		clear,
	} = useStore(state => {
		return {
			file: state.file,
			summary: state.summary,
			transcript: state.transcript,
			loading: state.loading,
			translations: state.translations,
			sentiment: state.sentiment,
			setLoading: state.setLoading,
			setSummary: state.setSummary,
			setTranslations: state.setTranslations,
			setSentiment: state.setSentiment,
			clear: state.clear,
		};
	});

	const router = useRouter();

	const handleCopy = async () => {
		if (!file) return;
		const content = `Transcript of ${file.name} (${convertBytes(
			file.size
		)})\n\n${transcript}\n\nSummary\n\n${summary}`;
		await navigator.clipboard.writeText(content);
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

  // Redirect to home if no file; needs to be in useEffect to avoid race condition
  useEffect(() => {
    if (!file) router.push('/');
  }, [file, router]);

	/** Summary */
	useEffect(() => {
		const fetchSummary = async () => {
			if (file) {
				const formData = new FormData();
				formData.append('text', transcript);
				const response = await fetch('/api/summarize', {
					method: 'POST',
					body: formData,
				});
				const result = await response.json();
				console.log('result', result);
				setSummary(result.result.response);
			}
		};

		if (transcript) fetchSummary();
	}, [transcript, file, setSummary]);

	/** Sentiment */
	useEffect(() => {
		const fetchSentiment = async () => {
			if (transcript) {
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
			}
		};
		fetchSentiment();
	}, [transcript, setSentiment]);

	/** Translation */
	useEffect(() => {
		const fetchTranslation = async () => {
			if (transcript) {
				/** Run all the translation requests simultaneously. */
				const promises = Object.keys(translations).map(async language => {
					const formData = new FormData();
					formData.append('text', transcript);
					formData.append('target_lang', language);
					const response = await fetch('/api/translate', {
						method: 'POST',
						body: formData,
					});
					const result = await response.json();
					const newText = result.result.translated_text;
          const timeTaken = result.result.timeTaken;
					return { language, newText, timeTaken};
				});

				const results = await Promise.all(promises);
				results.forEach(({ language, newText, timeTaken }) => {
					setTranslations(language, newText, timeTaken);
				});
			}
		};
		fetchTranslation();
	}, [transcript, setTranslations, translations]);

	console.log('sentiment', sentiment);
	return (
		<div className='mx-auto w-4/6'>
			<div>
				<ResultControls />
			</div>
			{transcript ? (
				<StyledCard
					header='Transcript'
					model='OpenAI Whisper'
					content={transcript}
				/>
			) : (
				<LoadingCard header='Transcript' />
			)}
			{summary ? (
				<StyledCard
					header='Summary'
					model='Meta Llama 2 7b'
					content={summary}
				/>
			) : (
				<LoadingCard header='Summary' />
			)}
			{sentiment.length > 0 ? (
				<StyledCard
					header='Sentiment'
					model='Quantized DistilBERT'
					content={sentiment}
				/>
			) : (
				<LoadingCard header='Sentiment' />
			)}
			{Object.keys(translations).map(language => {
				return translations[language] ? (
					<StyledCard
						key={language}
						header={`${language} Translation`}
						model='M2M100'
						content={translations[language]}
            timeTaken={translations[language].timeTaken}
					/>
				) : (
					<LoadingCard
						key={language}
						header={`${language} Translation`}
					/>
				);
			})}
		</div>
	);
}
