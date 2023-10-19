import {
	CopyIcon,
	Cross2Icon,
	HeartFilledIcon,
	ListBulletIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Loading from './loading';
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
import { TranscriptButtonsType } from '../lib/types';
import { useEffect } from 'react';
import { Skeleton } from "../components/ui/skeleton"


export default function Transcript() {
	const {
		file,
		summary,
		submitted,
		transcript,
		loading,
		setLoading,
		setSubmitted,
		setSummary,
		clear,
	} = useStore(state => {
		return {
			file: state.file,
			summary: state.summary,
			submitted: state.submitted,
			transcript: state.transcript,
			loading: state.loading,
			setLoading: state.setLoading,
			setSubmitted: state.setSubmitted,
			setSummary: state.setSummary,
			clear: state.clear,
		};
	});

	const handleCopy = async () => {
    if (!file) return;
    const content = `Transcript of ${file.name} (${convertBytes(file.size)})\n\n${transcript}\n\nSummary\n\n${summary}`
		await navigator.clipboard.writeText(transcript);
		toast.success('Copied to clipboard!');
	};

	const transcriptButtons: TranscriptButtonsType = [
		{
			name: 'Copy',
			icon: <CopyIcon />,
			variant: 'secondary',
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

	// if (loading) return <Loading />;

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
      {transcript && summary && <TranscriptButtons transcriptButtons={transcriptButtons} />}
		</div>
	);
}

const LoadingCard = () => {
  return (
    <Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
      <CardHeader>
        <CardTitle className='uppercase text-xs tracking-wider'>Loading...</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton />
      </CardContent>
    </Card>
  );
}

const StyledCard = ({
	header,
	model,
	content,
}: {
	header: string;
	model: string;
	content: string;
}) => {
	return (
		<Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
			<CardHeader>
				<CardTitle className='uppercase text-xs tracking-wider'>{header}</CardTitle>
				<CardDescription className='uppercase text-xs text-slate-400 tracking-wider'>{model}</CardDescription>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
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
