import { Tab } from '@headlessui/react';
import Dropzone from './dropzone';
import { useState } from 'react';
import Recorder from './recorder';

export default function Chooser() {
	const [selectedTab, setSelectedTab] = useState(0);

	const tabs = [
		{
			name: 'Upload File',
			component: <Dropzone />,
		},
		{
			name: 'Record Audio',
			component: <Recorder />,
		},
	];

	return (
		<Tab.Group>
			<Tab.List
				className={`w-3/5 flex bg-slate-50 shadow dark:bg-slate-900 rounded-md m-3 p-1`}>
				{tabs.map((tab, index) => (
					<Tab
						key={tab.name}
						onClick={() => setSelectedTab(index)}
						className={`px-4 text-xs flex-grow py-2 transition-all ease-in-out duration-300 rounded-md  m-2 ${
							selectedTab === index
								? 'ring-2 bg-slate-200 dark:bg-slate-800 ring-slate-300 dark:ring-slate-700'
								: 'bg-white dark:bg-black'
						}`}>
						{tab.name}
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels
				className={
					'bg-slate-100 shadow dark:bg-slate-900 w-3/5 h-2/5 rounded-md p-3'
				}>
				{tabs.map(tab => (
					<Tab.Panel
						key={tab.name}
						className='h-full w-full flex justify-center mx-auto'>
						{tab.component}
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
}
