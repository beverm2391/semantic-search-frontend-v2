import { useCallback, useEffect, useState } from 'react'
import AccordionDemo from './Accordion'
import ToggleLength from './ToggleGroup'
import Select from './Select'

export default function UI(props) {
    const {
        docs,
        setSelectedDoc,
        selectedLength,
        setSelectedLength,
        query,
        setQuery,
        responseData,
        getResponse,
        loading,
        flash,
        elapsedTime,
        cancelRequest
    } = props;

    // make a request to the API via the index page
    const handleClick = useCallback(() => {
        getResponse();
    }, [getResponse]);

    // responseData schema
    // {'time' : 0.123, 'tokens' : tokens, 'cost': 0.12, 'response': response, 'context_pages' : [page1, page2, page3]]}

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Enter' && event.metaKey) {
                handleClick();
            }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [handleClick]);

    return (
        <div className='main-container'>
            <div className='col1 align-start'>
                <div className='input-container p-0'>
                    {/* <textarea
                        className='w-full p-4 rounded-xl bg-white dark:bg-gray-800'
                        placeholder="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    /> */}
                    <input
                        type='text'
                        className='w-full p-4 rounded-xl bg-white dark:bg-gray-800 dark:text-gray-200'
                        placeholder="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <div className='buttons-container'>
                    <button
                        className={'bg-purple-500 text-white font-medium py-3 px-4 w-48 rounded-xl hover:scale-[1.01] hover:bg-purple-400 mr-3 dark:bg-purple-800 dark:hover:bg-purple-700'}
                        onClick={() => handleClick()}
                        disabled={loading}
                    >
                        Generate
                    </button>
                    <button
                        className={
                            loading ?
                            'bg-red-500 text-white font-medium py-3 px-4 w-48 rounded-xl hover:scale-[1.01] hover:bg-red-400 mr-4 dark:bg-red-600 dark:hover:bg-red-500' :
                            'bg-gray-300 text-white font-medium py-3 px-4 w-48 rounded-xl mr-4 dark:bg-gray-600'}
                        disabled={!loading}
                        onClick={cancelRequest}
                    >
                        Cancel
                    </button>
                </div>
                <div className='output-container dark:bg-gray-800 dark:text-gray-200'>
                    {loading ?
                        <p>Loading... {elapsedTime.toFixed(2)}s</p> :
                        responseData ?
                            <p className={`${flash}`}>{responseData['response']}</p> :
                            <p className='text-gray-400 dark:text-gray-600'>reponse will show up here</p>
                    }
                </div>
            </div>
            <div className='col2 text-gray-600 dark:text-gray-400'>
                <div className='settings-container flex flex-col'>
                    <div className='flex justify-center items-center py-[10px] px-2 rounded-lg'>
                        <ToggleLength
                            selectedLength={selectedLength}
                            setSelectedLength={setSelectedLength}
                        />
                    </div>
                    {/* <div className='flex justify-center items-center bg-gray-100 py-[10px] px-2 rounded-lg'>
                        <p>Status Component</p>
                    </div> */}
                </div>
                <div className='stats-container'>
                    <Select docs={docs} setSelectedDoc={setSelectedDoc} />

                    <h3 className='font-medium text-gray-800 dark:text-gray-300'>Pages Accessed:</h3>
                    <p className={`${flash} mb-1`}>{responseData ?
                        responseData['context_pages'].map((page, index) => {
                            if (index === responseData['context_pages'].length - 1) {
                                return <span key={index}>{page}</span>
                            } else {
                                return <span key={index}>{page}, </span>
                            }}) : 'N/A'
                        }</p>

                    <h3 className='font-medium text-gray-800 dark:text-gray-300'>Response Time:</h3>
                    <p className={`${flash}`}>
                        {responseData ?
                            <p>{responseData['time']}s</p> :
                            'N/A'
                        }
                    </p>
                </div>
                <div className='instructions-container'>
                    <AccordionDemo />
                </div>
            </div>
        </div>
    )
}