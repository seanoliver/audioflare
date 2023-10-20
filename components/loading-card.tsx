import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const LoadingCard = () => {
	return (
		<Card className='dark:bg-slate-700 dark:text-slate-300 text-sm border-0 shadow my-4'>
			<CardHeader>
				<CardTitle className='uppercase text-xs tracking-wider'>
					Loading...
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex items-center space-x-4'>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[200px] md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px]' />
						<Skeleton className='h-4 w-[150px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]' />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};