import { useEffect, useRef } from "react";

export default function DropzoneEmpty({
  handleFileSelected,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  inDrag
}: {
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  inDrag: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
		<div
      onClick={() => fileInputRef.current?.click()}
			className='h-full flex flex-col justify-center cursor-pointer'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
			<input ref={fileInputRef} type='file' className='hidden' onChange={handleFileSelected} accept='audio/*' />
			<div
				className={`flex justify-center flex-col sm:px-10 px-4 transition-all gap-4 ease-in-out duration-300 text-slate-500 items-center text-xs h-full w-full border-2 rounded-md border-dashed border-slate-400 ${
					inDrag ? 'bg-slate-300 dark:bg-slate-700' : ''
				}`}>
				<p>Drop an audio file here, or click to select one.</p>
        <p>Max duration: 30 seconds</p>
			</div>
		</div>
	);
}
