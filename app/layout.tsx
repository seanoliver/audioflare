import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '../components/footer';
import { Toaster } from 'react-hot-toast';
import Header from '../components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Audioflare',
	description: 'Transcribe, Analyze, Translate: All in One Cloudflare Playground',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${inter.className} w-screen h-screen  flex flex-col justify-between`}>
				<Toaster position='bottom-right' />
        <Header />
				<div>{children}</div>
				<Footer />
			</body>
		</html>
	);
}
