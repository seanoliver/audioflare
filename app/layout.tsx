import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '../components/footer';
import { Toaster } from 'react-hot-toast';
import Header from '../components/header';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Audioflare';
const APP_DESCRIPTION = 'Transcribe, Analyze, Translate: All in One Cloudflare Playground';
const APP_URL = process.env.NODE_ENV === 'production' ? 'https://audioflare.seanoliver.dev' : 'http://localhost:3000';

export const metadata: Metadata = {
	title: APP_NAME,
	description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },

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
