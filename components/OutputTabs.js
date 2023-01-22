import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

function OutputTabs(props) {
    const {
        responseStream,
        loadingStream,
    } = props;
    return (
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="see information">
                <Tabs.Trigger className="TabsTrigger" value="tab1">
                    Query
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Upload
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                {loadingStream ?
                    <p>Loading...</p> :
                    responseStream ? responseStream.map((item, index) => {
                        if (item === '\n' && index < 5) {
                            return
                        }
                        else if (item === ' ') {
                            return (
                                <span key={index}>{item}</span>
                            )
                        } else {
                            return (
                                <span key={index} className='stream-flash'>{item}</span>
                            )
                        }
                    }) :
                        <p className='text-gray-500 dark:text-gray-500'>response will show up here</p>
                }
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                    <div className='py-2 px-1 bg-gray-200 rounded-md w-[auto]'><p>Name:</p></div>
                    <p>{' '}name goes here</p>
                    <p className='mb-4'>
                        <span className='py-2 px-1 bg-gray-200 rounded-md'>
                            Description:
                        </span>
                        {' '}this is the description of whatever the document that is selected it
                    </p>
            </Tabs.Content>
        </Tabs.Root >
    )
}

export default OutputTabs;