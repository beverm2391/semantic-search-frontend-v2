import Button from './Button'
import { useState } from 'react'

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
                    <Button className='bg-gray-600 text-white dark:bg-gray-400 dark:text-black font-bold py-2 px-8 rounded-xl hover:scale-[1.01] hover:bg-gray-500 mr-4'>
                        Think
                    </Button>
                    <Button className='bg-gray-600 text-white dark:bg-gray-400 dark:text-black font-bold py-2 px-8 rounded-xl hover:scale-[1.01] hover:bg-gray-500 mr-4'>
                        Stop
                    </Button>
                </div>
                <div className='output-container'>
                    <p>{query}</p>
                </div>
            </div>
            <div className='col2 text-gray-600 dark:text-gray-400'>
                <div className='settings-container'>
                    <p>Tab/toggle compoenent</p>
                    <p>Status Component</p>
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
            </div>
        </div>
    )
}