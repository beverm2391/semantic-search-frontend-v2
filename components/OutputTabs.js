import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

function OutputTabs(props) {
    const {
        responseStream,
        loadingStream,
    } = props;
    return (
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
                <Tabs.Trigger className="TabsTrigger" value="tab1">
                    Response
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Document Info
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                <div className='output-container dark:bg-gray-800 dark:text-gray-200'>
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
                </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                <div className='output-container'>
                    Docs info
                </div>
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default OutputTabs;