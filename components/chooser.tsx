import { Tab } from '@headlessui/react';
import Dropzone from './dropzone';
import { useState } from 'react';

export default function Chooser({
	setTranscript,
}: {
	setTranscript: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
	const tabs = [
		{
			name: 'Upload File',
			component: <Dropzone setTranscript={setTranscript} />,
		},
		{ name: 'Record Audio', component: 'Recording Here' },
	];
	return (
		<Tab.Group>
			<Tab.List
				className={`w-3/5 flex bg-slate-200 dark:bg-slate-800 rounded-md m-3 p-1`}>
				{tabs.map((tab, index) => (
					<Tab
						key={tab.name}
            onClick={() => setSelectedTab(index)}
						className={`px-4 text-xs flex-grow py-2 rounded-md bg-slate-100 hover:dark:bg-slate-700 dark:bg-slate-900 m-2 ${selectedTab === index ? 'ring-2 ring-slate-600' : ''}`}>
						{tab.name}
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels
				className={'bg-slate-200 dark:bg-slate-800 w-3/5 h-2/5 rounded-md p-3'}>
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
