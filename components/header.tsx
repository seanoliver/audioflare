import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';

export default function Header() {
	return (
		<div className='flex max-w-2xl gap-4 justify-center items-center'>
			<div className='w-1/3'>
				<AspectRatio ratio={1 / 1}>
					<Image
						src='/images/marv.webp'
						alt='Marv'
						fill={true}
						className='rounded-md border-1 border-slate-100 shadow-md p-6 bg-white'
					/>
				</AspectRatio>
			</div>
      <div>
        <h1 className='text-xl'>Bad Transcript</h1>
        <h2>Audio transcripts by Marv, a grumpy old man who&apos;s sick of listening to your voice.</h2>
      </div>
		</div>
	);
}
