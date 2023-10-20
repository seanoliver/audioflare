import { MutableRefObject, useRef } from 'react';
import { SentimentType } from '../lib/types';
import { BarChart } from './bar-chart';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';

export const StyledCard = ({
	header,
	model,
	content,
}: {
	header: string;
	model: string;
	content: string | SentimentType;
}) => {
	const chartRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
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
			{isSentiment && chartRef ? (
				<CardContent
					className='mx-auto'
					ref={chartRef}>
					<BarChart
						data={content as SentimentType}
						chartRef={chartRef}
					/>
				</CardContent>
			) : (
				<CardContent className='mx-auto'>{content as string}</CardContent>
			)}
		</Card>
	);
};
