'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingCard } from '../../components/loading-card';
import ResultControls from '../../components/result-controls';
import { StyledCard } from '../../components/styled-card';
import { useStore } from '../../lib/store';
import { SentimentType } from '../../lib/types';

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
	// Redirect to home if no file
	useEffect(() => {
		if (!file) router.push('/');
	}, [file, router]);

	/** Summary */
	useEffect(() => {
		if (summary.text) return;
		const fetchSummary = async () => {
			if (file) {
				const formData = new FormData();
				formData.append('text', transcript.text);
				const response = await fetch('/api/summarize', {
					method: 'POST',
					body: formData,
				});
				const result = await response.json();
				setSummary({
					text: result.result.response,
					timeTaken: result.timeTaken,
				});
			}
		};

		if (transcript.text) fetchSummary();
	}, [transcript, file, setSummary]);

	/** Sentiment */
	useEffect(() => {
		if (sentiment.length > 0) return;
		const fetchSentiment = async () => {
			if (transcript.text) {
				const formData = new FormData();
				formData.append('text', transcript.text);
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
			if (transcript.text) {
				/** Run all the translation requests simultaneously. */
				const promises = Object.keys(translations).map(async language => {
					if (translations[language].text)
						return {
							language,
							newText: translations[language].text,
							timeTaken: translations[language].timeTaken,
						};
					const formData = new FormData();
					formData.append('text', transcript.text);
					formData.append('target_lang', language);
					const response = await fetch('/api/translate', {
						method: 'POST',
						body: formData,
					});
					const result = await response.json();
					console.log('translation > result', result);
					const newText = result.result.translated_text;
					const timeTaken = result.timeTaken;
					return { language, newText, timeTaken };
				});

				const results = (await Promise.all(promises)).filter(Boolean);
				results.forEach(({ language, newText, timeTaken }) => {
					setTranslations(language, newText, timeTaken);
				});
			}
		};
		fetchTranslation();
	}, [transcript, setTranslations, translations]);

	return (
		<div className='mx-auto w-4/6'>
			<div className='columns-3xs'>
				<div>
					<ResultControls />
				</div>
				{transcript.text ? (
					<StyledCard
						header='Transcript'
						model='OpenAI Whisper'
						content={transcript.text}
						timeTaken={transcript.timeTaken}
					/>
				) : (
					<LoadingCard header='Transcript' />
				)}
				{summary.text ? (
					<StyledCard
						header='Summary'
						model='Meta Llama 2 7b'
						content={summary.text}
						timeTaken={summary.timeTaken}
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
					return translations[language].text ? (
						<StyledCard
							key={language}
							header={`${language} Translation`}
							model='M2M100'
							content={translations[language].text}
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
		</div>
	);
}
