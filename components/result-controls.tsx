import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { useStore } from '../lib/store';
import { convertBytes } from '../lib/utils';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultControls() {
	const { file, clear } = useStore(state => {
		return {
			file: state.file,
      clear: state.clear,
		};
	});
  const router = useRouter();

	const audioSrc = file ? URL.createObjectURL(file) : '';
	const AudioPlayer = () => {
		return (
			<audio
				controls
				src={audioSrc}
        className='w-full h-10 text-xs border-2 rounded-md'>
				Your browser does not support the audio element.
			</audio>
		);
	};

	const { name, size } = file || { name: '', size: 0 };

  const handleRestart = () => {
    clear();
    router.push('/');
  }

  useEffect(() => {
    if (!file) {
      router.push('/');
    }
  }, [file, router]);

	return (
		<Card className='bg-indigo-50 mt-4'>
			<CardHeader className='flex flex-col'>
				<CardTitle className='uppercase text-xs tracking-wider leading-none'>
					{name}
				</CardTitle>
				<CardDescription className='uppercase text-xs text-indigo-400 tracking-wider leading-none'>
					{convertBytes(size)}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<AudioPlayer />
				<Button
					className='text-xs uppercase bg-indigo-200 text-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 flex flex-row justify-center items-center gap-2'
					variant={'default'}
          onClick={handleRestart}>
					<ReloadIcon />
					Start Over
				</Button>
			</CardContent>
		</Card>
	);
}
