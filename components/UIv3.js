import { useCallback, useEffect, useState, useRef, useContext } from 'react'
import AccordionDemo from './Accordion'
import ToggleLength from './ToggleLength'
import Select from './Select'
import AccordianSelectDoc from './AccordionSelectDoc';
import OutputTabs from './OutputTabs';
import * as Separator from '@radix-ui/react-separator';
import ResponseContainer from './ResponseContainer';
import { motion } from 'framer-motion';

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
        docForUpload,
        setDocForUpload,
        uploadDoc,
        getResponseStream,
        responseStream,
        loadingStream,
        folders,
        textAreaValue,
        setTextAreaValue,
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

    const DocInfoContainer = (props) => {
        return (
            <div className={`fade-in ${props.activeTab === 1 ? 'hidden' : ''}`}>
                <p>Test 2</p>
            </div>
        )
    }

    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className='ui-wrapper flex flex-col md:flex-row justify-center h-full w-full'>
            <div className='ui-sidebar flex flex-col gap-2 w-full md:max-w-[350px] md:border-r-2 p-8 dark:bg-satin-deep-black border-gray-200 dark:border-gray-800 text-black dark:text-white md:h-full border-b-2'>
                {/* <h3 className='text-lg font-medium mt-4'>Settings</h3>
                <div className='flex flex-col'>
                    <p>Setting 1</p>
                    <p>Setting 2</p>
                    <p>Setting 3</p>
                </div> */}
                {/* <h3 className='text-lg font-medium mt-4 mb-4'>Documents</h3> */}
                <p className='rounded-lg mb-4 text-sm'><span className='bg-purple-500 dark:bg-purple-600  text-white rounded-full px-2 py-1 font-medium'>Selected:</span><span className='ml-2 italic font-merry text-gray-800 dark:text-gray-200'>&quot;{selectedDoc ? selectedDoc.substring(0, 20) : 'no document selected'}{selectedDoc && selectedDoc.length > 20 && '...'}&quot;</span></p>
                <Separator.Root className='w-full bg-gray-200 dark:bg-gray-700 h-[2px] mb-2' />
                <div className='documents-container'>
                    <AccordianSelectDoc folders={folders} setSelectedDoc={setSelectedDoc} />
                </div>
            </div>

            <div className='ui-container flex flex-col w-full max-h-full'>
                <div className='tabscontainer mb-2 flex flex-row border-gray-200 dark:border-gray-800 text-gray-400'>
                    <button
                        className={`h-12 min-w-[9rem] font-medium text-base mx-1 px-8 rounded-b-xl ${activeTab == 1 ? 'active-tab border-black dark:border-white bg-white dark:bg-gray-800 shadow-md  text-gray-700 dark:text-gray-200' : 'inactive-tab bg-gray-200 dark:bg-satin-deep-black dark:text-gray-500'}`}
                        onClick={() => setActiveTab(1)}>
                        Query
                    </button>
                    <button
                        className={`h-12  min-w-[9rem] font-medium text-base mx-1 px-8 rounded-b-xl ${activeTab == 2 ? 'active-tab border-black dark:border-white bg-white dark:bg-gray-800 shadow-md  text-gray-700 dark:text-gray-200' : 'inactive-tab bg-gray-200 dark:bg-satin-deep-black dark:text-gray-500'}`}
                        onClick={() => setActiveTab(2)}>
                        Documents
                    </button>
                </div>
                    <ResponseContainer
                        loadingStream={loadingStream}
                        responseStream={responseStream}
                        handleClick={handleClick}
                        loading={loading}
                        flash={flash}
                        textAreaValue={textAreaValue}
                        setTextAreaValue={setTextAreaValue}
                        query={query}
                        setQuery={setQuery}
                        activeTab={activeTab}
                    />
                    <DocInfoContainer
                        activeTab={activeTab}
                    />
            </div>
        </div>
    )
}