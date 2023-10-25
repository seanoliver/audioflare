import { useEffect, useRef } from 'react';

export default function DropzoneEmpty({
	handleFileSelected,
	handleDragOver,
	handleDragLeave,
	handleDrop,
	handleDragStart,
	inDrag,
	pacino,
	crowe,
	trump,
}: {
	handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragStart: (e: React.DragEvent<HTMLAnchorElement>) => void;
	inDrag: boolean;
	pacino: string;
	crowe: string;
	trump: string;
}) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const aacs = [pacino, crowe, trump];

	const AacLink = ({ aac, name }: { aac: string; name: string }) => {
		const path = aac;
		const segments = path.split('/');
		const filename = segments[segments.length - 1];
		return (
			<a
				href={aac}
				download
				data-file={name}
				draggable='true'
				onDragStart={handleDragStart}
				className='text-xs w-1/3 bg-orange-100 border-orange-200 border-2 rounded-md p-2 text-center hover:shadow drag:shadow'>
				{filename}
			</a>
		);
	};

	return (
		<div className='flex flex-col h-full'>
			<div
				onClick={() => fileInputRef.current?.click()}
				className='h-full flex flex-col justify-center cursor-pointer'
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}>
				<input
					ref={fileInputRef}
					type='file'
					className='hidden'
					onChange={handleFileSelected}
					accept='audio/*'
				/>
				<div
					className={`flex justify-center flex-col sm:px-10 px-4 transition-all gap-4 ease-in-out duration-300 items-center text-xs h-full py-24 w-full border-2 rounded-md border-dashed border-orange-400 ${
						inDrag ? 'bg-orange-300 dark:bg-orange-700' : ''
					}`}>
					<p>Drop an audio file here, or click to select one.</p>
					<p>Max duration: 30 seconds</p>
				</div>
			</div>
			<div>
				<p className='text-xs mt-8 text-center'>No audio file? Try one of these to get started:</p>
				<div className='flex gap-2 mt-2'>
					{aacs.map((aac, index) => {
						const name = ['pacino', 'crowe', 'trump'][index];
						return (
							<AacLink
								key={aac}
								aac={aac}
								name={name}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
