import { useCallback, useEffect, useState, useRef } from 'react'
import AccordionDemo from './Accordion'
import ToggleLength from './ToggleLength'
import Select from './Select'
import AccordianSelectDoc from './AccordionSelectDoc';

export default function UINew(props) {
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
        cancelRequest,
        docForUpload,
        setDocForUpload,
        uploadDoc,
        getResponseStream,
        responseStream,
        loadingStream,
        folders,
    } = props;

    // make a request to the API via the index page
    // const handleClick = useCallback(() => {
    //     getResponse();
    // }, [getResponse]);

    const handleClick = useCallback(() => {
        getResponseStream();
    }, [getResponseStream]);

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

    // ! FOR FILE UPLOAD ------------------------------------------------------
    const fileUploadRef = useRef(null)
    const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            setDocForUpload(e.target.files[0])
        }
    }

    // ! Unpack responseData --------------------------------------------------
    const context_pages = responseData && responseData['context_pages'] ? responseData['context_pages'] : null;
    const response_time = responseData && responseData['time'] ? responseData['time'] : null;

    return (
        <div className='main-container'>
            <div className='v2-col3'>
            <div className='stats-container'>
                    <button
                        className='inline-flex justify-center items-center mb-3 w-full bg-gray-50 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-600 border-gray-100 border-2 font-merry hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer'
                        onClick={() => fileUploadRef.current.click()}
                    >
                        {docForUpload ?
                            <p>{docForUpload.name.substring(0, 20)}...</p> :
                            <p className='text-gray-500'>nothing selected...</p>
                        }
                    </button>
                    <button
                        onClick={() => uploadDoc()}
                        className='text-purple-500 dark:text-purple-500 border-2 border-purple-500 dark:border-purple-600 font-medium py-3 px-4 w-full rounded-lg hover:bg-purple-100 dark:bg-g-600 dark:hover:bg-slate-700'
                    >
                        Upload
                    </button>
                    <input type='file' name='image' ref={fileUploadRef} onChange={onFileChange} multiple={false} className='hidden' />
                </div>
                <div className='documents-container'>
                    <AccordianSelectDoc folders={folders} setSelectedDoc={setSelectedDoc}/>
                </div>
            </div>
            <div className='v2-col1'>
                <div className='input-container p-4'>
                    {/* <textarea
                        className='w-full p-4 rounded-xl bg-white dark:bg-gray-800'
                        placeholder="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    /> */}
                    <input
                        type='text'
                        className='w-full p-4 rounded-xl bg-white dark:bg-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-700 mb-4'
                        placeholder="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className='buttons-container'>
                        <button
                            className={'bg-purple-500 text-white font-medium py-3 px-4 w-36 rounded-lg hover:scale-[1.01] hover:bg-purple-400 mr-3 dark:bg-purple-800 dark:hover:bg-purple-700'}
                            onClick={() => handleClick()}
                            disabled={loading}
                        >
                            Generate
                        </button>
                        <button
                            className={
                                loading ?
                                    'bg-red-500 text-white font-medium py-3 px-4 w-36 rounded-lg hover:scale-[1.01] hover:bg-red-400 mr-4 dark:bg-red-600 dark:hover:bg-red-500' :
                                    'bg-gray-300 text-gray-500 font-medium py-3 px-4 w-36 rounded-lg mr-4 dark:bg-gray-600'}
                            disabled={!loading}
                            onClick={cancelRequest}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
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
                    {/* <p>
                        {responseStream && responseStream.map((item, index) => {
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
                        })}
                    </p> */}
                </div>
            </div>
            <div className='v2-col2 text-gray-600 dark:text-gray-400'>
                <div className='settings-container flex flex-col'>
                    <div className='flex justify-center items-center py-2 px-2 rounded-lg'>
                        <ToggleLength
                            selectedLength={selectedLength}
                            setSelectedLength={setSelectedLength}
                        />
                    </div>
                </div>
                <div className='stats-container'>
                    <h3 className='font-medium text-gray-800 dark:text-gray-300'>Pages Accessed:</h3>
                    <p className={`${flash} mb-1`}>{context_pages ?
                        context_pages.map((page, index) => {
                            if (index === context_pages.length - 1) {
                                return <span key={index}>{page}</span>
                            } else {
                                return <span key={index}>{page}, </span>
                            }
                        }) : 'N/A'
                    }</p>

                    <h3 className='font-medium text-gray-800 dark:text-gray-300'>Response Time:</h3>
                    <p className={`${flash}`}>
                        {response_time ?
                            `${response_time}s` :
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