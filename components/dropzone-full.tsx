import { Button, buttonVariants } from './ui/button';
import { convertBytes } from '../lib/utils';
import { PaperPlaneIcon, ReloadIcon, ResetIcon } from '@radix-ui/react-icons';

export default function DropzoneFull({ file }: { file: File }) {
	return (
		<div className='text-xs flex flex-col justify-center items-center w-full h-full'>
			<p>{file.name}</p>
			<p>{convertBytes(file.size)}</p>
			<div className='flex gap-2 justify-center items-center'>
				<Button
					className={`mt-2 text-xs dark:bg-indigo-700 bg-indigo-400 hover:bg-indigo-500 dark:hover:bg-indigo-800`}>
					<PaperPlaneIcon className='mr-2' /> Submit
				</Button>
				<Button
					className={`mt-2 text-xs dark:bg-indigo-700 dark:hover:bg-indigo-800`}
					variant={'destructive'}>
					<ReloadIcon className='mr-2' /> Start Over
				</Button>
			</div>
		</div>
	);
}
