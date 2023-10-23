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

export const StyledCard = ({
	header,
	model,
	content,
  timeTaken
}: {
	header: string;
	model: string;
	content: string | SentimentType;
  timeTaken?: number;
}) => {
	const chartRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
	const isSentiment = typeof content !== 'string';

	const handleCopy = async () => {
    let copyContent: string | SentimentType = '';
    if (isSentiment) {
      content.map((c) => {
        copyContent += `${c.label}: ${c.score}%\n`
      })
    } else {
      copyContent = content as string;
    }
		await navigator.clipboard.writeText(copyContent);
		toast.success('Copied to clipboard!');
	};

	return (
		<Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
			<CardHeader className='flex flex-row w-full justify-between'>
				<div>
					<CardTitle className='uppercase text-xs tracking-wider'>
						{header}
					</CardTitle>
					<CardDescription className='uppercase text-xs text-slate-400 tracking-wider'>
						{model} ⋅ {timeTaken ? `${timeTaken}ms` : ''}
					</CardDescription>
				</div>
        <div>
          <Button variant={'ghost'} onClick={handleCopy}><CopyIcon className='h-3 w-3' /></Button>
        </div>
			</CardHeader>
			{isSentiment && chartRef ? (
				<CardContent
					className='mx-auto'
					ref={chartRef}>
					<SentimentNums
						data={content as SentimentType}
					/>
				</CardContent>
			) : (
				<CardContent className='mx-auto'>{content as string}</CardContent>
			)}
		</Card>
	);
};
