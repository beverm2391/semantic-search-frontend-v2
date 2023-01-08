import Button from './Button'
import { useState } from 'react'
import AccordionDemo from './Accordion'

export default function UI() {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')

    return (
        <div className='main-container'>
            <div className='col1 align-start'>
                <div className='input-container p-0'>
                    <textarea
                        className="textarea textarea-ghost w-full max-h-[2rem]"
                        placeholder="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <div className='buttons-container'>
                    <Button className='bg-blue-500 text-white font-medium py-[10px] px-[20px] rounded-xl hover:scale-[1.01] hover:bg-blue-400 mr-4 dark:bg-blue-800 dark:hover:bg-blue-700'>
                        Generate
                    </Button>
                    <Button className='bg-red-500 text-white font-medium py-[10px] px-[20px] rounded-xl hover:scale-[1.01] hover:bg-red-400 mr-4 dark:bg-red-600 dark:hover:bg-red-500'>
                        Cancel
                    </Button>
                </div>
                <div className='output-container'>
                    <p>{query}</p>
                </div>
            </div>
            <div className='col2 text-gray-600 dark:text-gray-400'>
                <div className='settings-container flex flex-col'>
                    <div className='flex justify-center items-center bg-gray-100 py-[10px] px-2 rounded-lg mb-4'>
                        <p>Toggle length</p>
                    </div>
                    <div className='flex justify-center items-center bg-gray-100 py-[10px] px-2 rounded-lg'>
                        <p>Status Component</p>
                    </div>
                </div>
                <div className='stats-container'>
                    <h3 className='font-bold text-gray-800 dark:text-gray-200'>
                        Document selector
                    </h3>
                    <h3 className='font-bold text-gray-800 dark:text-gray-200'>Pages Accessed:</h3>
                    <p>34, 12 ,12</p>
                    <h3 className='font-bold text-gray-800 dark:text-gray-200'>Response Time:</h3>
                    <p>0.2s</p>
                </div>
                <div className='instructions-container'>
                    <AccordionDemo/>
                </div>
            </div>
        </div>
    )
}