import { SentimentType } from '../lib/types';

export const SentimentNums = ({ data }: { data: SentimentType }) => {
	const labelValues = {
		NEGATIVE: {
			name: 'Negative',
			color: 'text-red-500',
		},
		POSITIVE: {
			name: 'Positive',
			color: 'text-green-500',
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
			<div className='flex flex-row w-full justify-evenly my-4'>
				{layoutData.map(d => (
					<div
						key={d.score}
						className={`${d.color} h-4 flex flex-col items-center justify-center `}>
              <p className='text-xl font-semibold'>{d.score}%</p>
              <p className='text-xs'>{d.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
