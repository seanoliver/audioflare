'use client';

import Chooser from '../components/chooser';
import Header from '../components/header';
import React, { useEffect, useState } from 'react';

export default function Home() {
	const [transcript, setTranscript] = useState<string | null>(null);



	// useEffect(() => {
	// 	if (transcript) {
	// 		setLoading(false);
	// 		const fetchSummary = async () => {
	// 			const response = await fetch('/api/summarize', {
	// 				method: 'POST',
	// 				body: transcript,
	// 			});
	// 			console.log('page.tsx > useEffect > fetchSummary > response', response);
	// 			const reader = response.body?.getReader();
	// 			const decoder = new TextDecoder('utf-8');
	// 			let result = '';

	// 			if (reader) {
  //         // @ts-ignore
	// 				reader.read().then(function processText({ done, value }) {
	// 					if (done) {
	// 						setStream(result);
	// 						return;
	// 					}
	// 					result += decoder.decode(value);
	// 					return reader.read().then(processText);
	// 				});
	// 			}
	// 		};
	// 		fetchSummary();
	// 	}
	// }, [transcript]);

	// useEffect(() => {

	// 	const eventsource = new EventSource('/api/summarize');

	// 	eventsource.onmessage = event => {
	// 		setStream(prevData => prevData + event.data);
	// 	};

	// 	return () => {
	// 		eventsource.close();
	// 	};

	// }, []);

	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Chooser setTranscript={setTranscript} />
			{/* <div>{transcript && <p>{transcript}</p>}</div>
			{stream && <div>{stream}</div>} */}
		</div>
	);
}
