import { CopyIcon, Cross2Icon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Loading from './loading';
import { useStore } from '../lib/store';

export default function Transcript() {
	const { submitted, transcript, loading, setSubmitted, clear } = useStore(
		state => {
			return {
				submitted: state.submitted,
				transcript: state.transcript,
				loading: state.loading,
				setSubmitted: state.setSubmitted,
				clear: state.clear,
			};
		}
	);

	// TODO: Use Suspense to show a loading indicator
	if (loading) return <Loading />;

	// TODO: Finalize these buttons
	return (
		<div className='flex flex-col justify-center items-center h-full text-sm px-20 gap-6'>
			<p>{transcript}</p>
			<div className='flex'>
				<Button
					variant={'default'}
					onClick={() => setSubmitted(!submitted)}
					className='bg-slate-700 text-xs text-slate-100 px-4 py-1 rounded-md m-2 flex gap-2'>
					<HeartFilledIcon />
				</Button>
				<Button
					variant={'default'}
					onClick={() => setSubmitted(!submitted)}
					className='bg-slate-700 text-xs text-slate-100 px-4 py-1 rounded-md m-2 flex gap-2'>
					<CopyIcon />
				</Button>
				<Button
					variant={'destructive'}
					onClick={() => clear()}
					className='bg-slate-700 text-xs text-slate-100 px-4 py-1 rounded-md m-2 flex gap-2'>
					<Cross2Icon />
				</Button>
			</div>
		</div>
	);
}
