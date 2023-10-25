import { Button, buttonVariants } from './ui/button';
import { convertBytes } from '../lib/utils';
import { PaperPlaneIcon, ReloadIcon, ResetIcon } from '@radix-ui/react-icons';
import { useStore } from '../lib/store';
import { useRouter } from 'next/navigation';

export default function DropzoneFull({ file }: { file: File }) {
  const { clear } = useStore(state => {
    return {
      clear: state.clear,
    }
  })

  const router = useRouter();

  const handleRestart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clear();
    router.push('/');
  }

	return (
		<div className='text-xs flex flex-col justify-center items-center w-full h-full'>
			<p>{file.name}</p>
			<p>{convertBytes(file.size)}</p>
			<div className='flex gap-2 justify-center items-center'>
				<Button
					className={`mt-2 text-xs dark:bg-orange-700 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800`}>
					<PaperPlaneIcon className='mr-2' /> Submit
				</Button>
				<Button
          type='button'
					className={`mt-2 text-xs`}
					variant={'destructive'}
          onClick={handleRestart}>
					<ReloadIcon className='mr-2'/> Start Over
				</Button>
			</div>
		</div>
	);
}
