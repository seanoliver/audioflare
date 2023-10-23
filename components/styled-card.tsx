import { MutableRefObject, useRef } from 'react';
import { SentimentType } from '../lib/types';
import { SentimentNums } from './sentiment-nums';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { CopyIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import { msToTime } from '../lib/utils';
import Link from 'next/link';

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
		toast.success('Copied to clipboard!');
	};

	const CopyLink = () => {
		return (
			<a
				onClick={handleCopy}
				className='hover:border-b-2 hover:cursor-pointer'>
				Copy
			</a>
		);
	};

	return (
		<Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
			<CardHeader className='flex flex-col md:flex-row w-full justify-between'>
				<CardTitle className='uppercase text-xs tracking-wider'>
					{header}
				</CardTitle>
				<CardDescription className='uppercase text-xs text-slate-400 tracking-wider'>
					{model}
					{timeTaken && ` ⋅ ${msToTime(timeTaken)}`}
					{!isSentiment && ` ⋅ `}
					{!isSentiment && <CopyLink />}
				</CardDescription>
			</CardHeader>
			{isSentiment ? (
				<CardContent
					className='mx-auto'>
					<SentimentNums data={content as SentimentType} />
				</CardContent>
			) : (
				<CardContent className='mx-auto'>{content as string}</CardContent>
			)}
		</Card>
	);
};
