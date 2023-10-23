import { TranscriptButtonsType } from "../lib/types";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const ActionButtons = ({
	transcriptButtons,
}: {
	transcriptButtons: TranscriptButtonsType;
}) => {
	return (
		<div className='flex'>
			{transcriptButtons.map((button, index) => {
				return (
					<TooltipProvider
						key={index}
						delayDuration={100}>
						<Tooltip>
							<TooltipTrigger>
								<Button
									variant={button.variant}
									onClick={button.onClick}
									className={button.className}>
									{button.icon}
								</Button>
							</TooltipTrigger>
							<TooltipContent
								side='bottom'
								className='dark:bg-indigo-600 bg-indigo-400'>
								{button.name}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</div>
	);
};
