import { RocketIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useStore } from "../lib/store";

export default function Loading() {
  const { transcript, setLoading } = useStore(state => {
    return {
      transcript: state.transcript,
      setLoading: state.setLoading,
    };
  });

  useEffect(() => {
		if (transcript) {
			setLoading(false);
		}
	}, [setLoading, transcript]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='animate-bounce'><RocketIcon /></p>
      <p className='font-extralight mt-4'>Loading...</p>
    </div>
  )
}