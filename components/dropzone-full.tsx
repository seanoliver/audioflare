import { Button, buttonVariants } from "./ui/button";
import { convertBytes } from "../lib/utils";

export default function DropzoneFull({
  file,
}: {
  file: File;
}) {

  return (
    <p className="text-xs text-slate-500 flex flex-col justify-center items-center w-full h-full">
      <p>{file.name}</p>
      <p>{convertBytes(file.size)}</p>
      <Button className={`mt-2 text-xs`}>Transcribe</Button>
    </p>
  )
}