'use client';

import Dropzone from '../components/dropzone';
import Results from '../components/results';
import { useStore } from '../lib/store';

export default function Home() {

  const { submitted, transcript } = useStore(state => {
    return {
      submitted: state.submitted,
      transcript: state.transcript,
    };
  });

	return (
		<div className='flex flex-col h-full w-full justify-center items-center'>
			{submitted || transcript ? <Results /> : <Dropzone />}
		</div>
	);

}
