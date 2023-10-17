import { useEffect, useRef } from "react";

export default function DropzoneEmpty({
  handleFileSelected,
  inDrag
}: {
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inDrag: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);


  return (
		<div
      onClick={() => fileInputRef.current?.click()}
			className='h-full flex flex-col justify-center cursor-pointer'>
			<input ref={fileInputRef} type='file' className='hidden' onChange={handleFileSelected} accept='audio/*' />
			<p
				className={`flex justify-center sm:px-10 px-4 transition-all ease-in-out duration-300 text-slate-500 items-center text-xs h-full w-full border-2 rounded-md border-dashed border-slate-400 ${
					inDrag ? 'bg-slate-300 dark:bg-slate-700' : ''
				}`}>
				Drop an audio file here, or click to select one.
			</p>
		</div>
	);
}
