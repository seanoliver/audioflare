import {
	CopyIcon,
	Cross2Icon,
	HeartFilledIcon,
	ListBulletIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { useStore } from '../lib/store';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { convertBytes } from '../lib/utils';
import toast from 'react-hot-toast';
import { SentimentType, TranscriptButtonsType } from '../lib/types';
import { useEffect } from 'react';
import { Skeleton } from '../components/ui/skeleton';
import * as d3 from 'd3';

export default function Transcript() {
	const {
		file,
		summary,
		submitted,
		transcript,
		loading,
		sentiment,
    translation,
		setLoading,
		setSubmitted,
		setSummary,
		setSentiment,
    setTranslation,
		clear,
	} = useStore(state => {
		return {
			file: state.file,
			summary: state.summary,
			submitted: state.submitted,
			transcript: state.transcript,
			loading: state.loading,
      translation: state.translation,
			sentiment: state.sentiment,
			setLoading: state.setLoading,
			setSubmitted: state.setSubmitted,
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
        setTranslation(result.result);
        setLoading(false);
      }
    }
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
				<TranscriptButtons transcriptButtons={transcriptButtons} />
			)}
		</div>
	);
}

const LoadingCard = () => {
	return (
		<Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
			<CardHeader>
				<CardTitle className='uppercase text-xs tracking-wider'>
					Loading...
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton />
			</CardContent>
		</Card>
	);
};

const StyledCard = ({
	header,
	model,
	content,
}: {
	header: string;
	model: string;
	content: string | SentimentType;
}) => {
	const isSentiment = typeof content !== 'string';
	return (
		<Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
			<CardHeader>
				<CardTitle className='uppercase text-xs tracking-wider'>
					{header}
				</CardTitle>
				<CardDescription className='uppercase text-xs text-slate-400 tracking-wider'>
					{model}
				</CardDescription>
			</CardHeader>
			<CardContent className='mx-auto'>
				{isSentiment ? (
					<BarChart data={content as SentimentType} />
				) : (
					(content as string)
				)}
			</CardContent>
		</Card>
	);
};

const BarChart = ({ data }: { data: SentimentType }) => {
	const margin = { top: 20, right: 20, bottom: 30, left: 40 };
	const width = 500 - margin.left - margin.right;
	const height = 200 - margin.top - margin.bottom;

	const x = d3
		.scaleBand()
		.domain(data?.map(d => d.label))
		.range([0, width])
		.padding(0.1);

	const y = d3
		.scaleLinear()
		.domain([0, d3.max(data, d => d.score) || 0])
		.range([height, 0]);

	return (
		<svg
			width={width + margin.left + margin.right}
			height={height + margin.top + margin.bottom}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				{data.map(d => (
					<rect
						key={d.label}
						x={x(d.label)}
						y={y(d.score)}
						width={x.bandwidth()}
						height={height - y(d.score)}
						fill={d.label === 'POSITIVE' ? 'green' : 'red'}
					/>
				))}
			</g>
		</svg>
	);
};

const TranscriptButtons = ({
	transcriptButtons,
}: {
	transcriptButtons: TranscriptButtonsType;
}) => {
	return (
		<div className='flex'>
			{transcriptButtons.map((button, index) => {
				return (
					<TooltipProvider
						key={index}
						delayDuration={100}>
						<Tooltip>
							<TooltipTrigger>
								<Button
									variant={button.variant}
									onClick={button.onClick}
									className={button.className}>
									{button.icon}
								</Button>
							</TooltipTrigger>
							<TooltipContent
								side='bottom'
								className='dark:bg-slate-600 bg-slate-400'>
								{button.name}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</div>
	);
};
