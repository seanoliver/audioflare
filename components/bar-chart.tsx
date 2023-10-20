import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SentimentType } from '../lib/types';
import * as d3 from 'd3';

export const BarChart = ({ data }: { data: SentimentType }) => {
	const labelValues = {
		NEGATIVE: {
			name: 'Negative',
			color: 'bg-red-500',
		},
		POSITIVE: {
			name: 'Positive',
			color: 'bg-green-500',
		},
	};

	const totalScore = data.reduce((acc, curr) => acc + curr.score, 0);

	const layoutData = data.map(d => {
		const { label, score } = d;
		const { name, color } = labelValues[label];
		const friendlyScore = Math.round((score / totalScore) * 100);
		return { name, score: friendlyScore, color };
	});

  console.log(layoutData, totalScore)

	return (
		<div className='w-full'>
			<div className='flex flex-row w-full'>
				{layoutData.map(d => (
					<div
						key={d.score}
						className={`w-[${d.score}%] h-4 ${d.color}`}>

					</div>
				))}
			</div>
		</div>
	);
};
