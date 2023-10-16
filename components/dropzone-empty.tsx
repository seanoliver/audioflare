export default function DropzoneEmpty({
  getRootProps,
  getInputProps,
  isDragActive,
}: {
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
}) {
	return (
		<div
			{...getRootProps()}
			className='h-full flex flex-col justify-center'>
			<input {...getInputProps()} />
			<p
				className={`flex justify-center sm:px-10 px-4 transition-all ease-in-out duration-300 text-slate-500 items-center text-xs h-full w-full border-2 rounded-md border-dashed border-slate-400 ${
					isDragActive ? 'bg-slate-300 dark:bg-slate-700' : ''
				}`}>
				Drop an audio file here, or click to select one.
			</p>
		</div>
	);
}
