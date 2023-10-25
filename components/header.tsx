import {
	FileIcon,
	GitHubLogoIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Image from 'next/image';

export default function Header() {
	return <SeparatorDemo />;
}

export function SeparatorDemo() {
	return (
		<div className='flex flex-col items-center my-20'>
			<div className='h-1'></div>
			<div className='space-y-1'>
				<div
					style={{
						backgroundImage: 'var(--logo)',
						width: '400px',
						height: '225px',
						backgroundSize: 'cover',
					}}
					alt='Audioflare'
				/>
				{/* <h4 className="text-lg font-semibold leading-none text-center">Audioflare</h4> */}
				<p className='text-sm text-muted-foreground text-center'>
					Transcribe, Analyze, Translate: All in One Cloudflare Playground
				</p>
			</div>

			<div className='flex h-5 items-center space-x-4 text-sm mt-4'>
        <a
          href='https://github.com/seanoliver/audioflare'
          target='_blank'
          rel='noopener noreferrer'>
				<Button variant='link'>
					<GitHubLogoIcon className='mr-2' /> Source
				</Button>
        </a>
				<Button variant='link'>
					<FileIcon className='mr-2' />
					Cloudflare Docs
				</Button>
			</div>
		</div>
	);
}
