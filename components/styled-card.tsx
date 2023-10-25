import { CopyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { SentimentType } from '../lib/types';
import { msToTime } from '../lib/utils';
import { SentimentNums } from './sentiment-nums';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export const StyledCard = ({
	header,
	model,
	content,
	timeTaken,
}: {
	header: string;
	model: string;
	content: string | SentimentType;
	timeTaken?: number;
}) => {
	const [showCopyOverlay, setShowCopyOverlay] = useState(false);
	const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
	const isSentiment = header.toLowerCase().includes('sentiment');

	const handleCopy = async () => {
		let copyContent: string | SentimentType = '';
		if (isSentiment) {
			// @ts-ignore
			content.map(c => {
				copyContent += `${c.label}: ${c.score}%\n`;
			});
		} else {
			copyContent = content as string;
		}
		await navigator.clipboard.writeText(copyContent);
		setShowCopiedOverlay(true);
		setTimeout(() => {
			setShowCopiedOverlay(false);
		}, 1500);
	};

	const ToolTip = ({
		hoverText,
		children,
	}: {
		hoverText: string;
		children: React.ReactNode;
	}) => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className='capitalize'>{children}</TooltipTrigger>
					<TooltipContent>{hoverText}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	};

	return (
		<Card
			className='text-sm border-0 shadow my-4 hover:shadow-xl transition-all ease-in-out relative break-inside-avoid'
			onMouseEnter={() => setShowCopyOverlay(true)}
			onMouseLeave={() => setShowCopyOverlay(false)}>
			{showCopyOverlay && !isSentiment && (
				<div
					className='absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center transition-all ease-in-out opacity-0 hover:opacity-100 duration-300 justify-center cursor-pointer'
					onClick={handleCopy}>
					<span className='text-white shadow'>Copy Text</span>
				</div>
			)}
			{showCopiedOverlay && !isSentiment && (
				<div className='absolute inset-0 bg-orange-500 flex items-center rounded-lg transition-all ease-in-out justify-center duration-300 opacity-100'>
					<span className='text-white'>Copied to Clipboard</span>
					<CopyIcon className='text-white ml-2' />
				</div>
			)}
			<CardHeader className='flex flex-col w-full justify-between'>
				<CardTitle className='uppercase text-xs tracking-wider'>
					{header}
				</CardTitle>
				<CardDescription className='text-xs'>
					{<ToolTip hoverText='Model'>{model}</ToolTip>}
					{timeTaken && ` ⋅ `}
					{timeTaken && (
						<ToolTip hoverText='Response Time'>{msToTime(timeTaken)}</ToolTip>
					)}
				</CardDescription>
			</CardHeader>
			{isSentiment ? (
				<CardContent className='mx-auto'>
					<SentimentNums data={content as SentimentType} />
				</CardContent>
			) : (
				<CardContent className='mx-auto'>{content as string}</CardContent>
			)}
		</Card>
	);
};
