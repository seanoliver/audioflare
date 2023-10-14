'use client';

import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [transcript, setTranscript] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
		}
	};

	const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			setLoading(true);
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch('/api/transcribe', {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();
			setTranscript(result.result.text);
		}
	};

	useEffect(() => {
		if (transcript) {
			setLoading(false);
		}
	}, [transcript]);

	return (
		<div>
			<h1>TL;DL</h1>
			<h2>Too Loud; Didn&apos;t Listen</h2>
			<form onSubmit={handleFileSubmit}>
				<input
					type='file'
					name='file'
					id='file'
					accept='audio/*'
					onChange={handleFileChange}
				/>
				<button
					type='submit'
					disabled={loading}>
					{loading ? 'Loading...' : 'Submit'}
				</button>
			</form>
			<div>{transcript && <p>{transcript}</p>}</div>
      {transcript && (
        <div>
				{messages.map(m => (
					<div key={m.id}>
						{m.role !== 'user' && m.content}
					</div>
				))}
			</div>
      )}
		</div>
	);
}
