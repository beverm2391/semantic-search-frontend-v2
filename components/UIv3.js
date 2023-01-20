import { useCallback, useEffect, useState, useRef } from 'react'
import AccordionDemo from './Accordion'
import ToggleLength from './ToggleLength'
import Select from './Select'
import AccordianSelectDoc from './AccordionSelectDoc';
import OutputTabs from './OutputTabs';
import * as Separator from '@radix-ui/react-separator';

export default function UINew(props) {
    const {
        docs,
        setSelectedDoc,
        selectedDoc,
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

    // responseData schema:
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
        <div className='ui-wrapper flex flex-row justify-center w-full h-max'>
            <div className='ui-sidebar flex flex-col gap-2 w-full max-w-[350px] border-r-2 p-8 dark:bg-satin-deep-black border-gray-200 dark:border-gray-800 text-black dark:text-white'>
                <h3 className='text-lg font-medium mt-4'>Settings</h3>
                <div className='flex justify-center items-center py-2 px-2 rounded-lg'>
                    <ToggleLength
                        selectedLength={selectedLength}
                        setSelectedLength={setSelectedLength}
                    />
                </div>
                <h3 className='text-lg font-medium mt-4 mb-4'>Documents</h3>
                <p className='rounded-lg mb-4 text-sm'><span className='bg-purple-500 text-white rounded-full px-2 py-1 font-medium'>Selected:</span><span className='ml-2 italic font-merry text-gray-800 dark:text-gray-200'>&quot;{selectedDoc ? selectedDoc.substring(0, 30) : 'no document selected'}{selectedDoc && selectedDoc.length > 30 && '...'}&quot;</span></p>
                <Separator.Root className='w-full bg-gray-200 dark:bg-gray-700 h-[2px] mb-2'/>
                <div className='documents-container'>
                    <AccordianSelectDoc folders={folders} setSelectedDoc={setSelectedDoc} />
                </div>
            </div>

            <div className='ui-container flex flex-col w-full h-full'>
                <OutputTabs loadingStream={loadingStream} responseStream={responseStream} />
            </div>
        </div>
    )
}