'use client';

import Chooser from '../components/chooser';
import Transcript from '../components/transcript';
import { useStore } from '../lib/store';

export default function Home() {

  const { submitted, transcript } = useStore(state => {
    return {
      submitted: state.submitted,
      transcript: state.transcript,
    };
  });

	return (
		<div className='flex h-full w-full flex-col justify-center items-center'>
			{submitted || transcript ? <Transcript /> : <Chooser />}
		</div>
	);

}
