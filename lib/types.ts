export interface TranscriptButtonType {
	name: string;
	icon: React.ReactNode;
	variant:
		| 'default'
		| 'secondary'
		| 'destructive'
		| 'link'
		| 'ghost'
		| 'outline'
		| null
		| undefined;
	className: string;
	onClick: () => void;
}

export type TranscriptButtonsType = TranscriptButtonType[];

export type SentimentType = { label: 'POSITIVE' | 'NEGATIVE', score: number }[];