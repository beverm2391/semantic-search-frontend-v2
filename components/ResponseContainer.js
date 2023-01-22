import { MotionConfig } from 'framer-motion';
import { EXPORT_MARKER } from 'next/dist/shared/lib/constants';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { BsSmartwatch } from 'react-icons/bs';

export default function ResponseContainer(props) {
    const {
        loading,
        responseData,
        elapsedTime,
        cancelRequest,
        responseStream,
        handleClick,
        textAreaValue,
        setTextAreaValue,
        loadingStream,
        query,
        setQuery,
        tab
    } = props;

    const queryRef = useRef(null)
    // ! I have to store the element in the state because if the user clicks on the tab the component will unmount and the ref will be null
    const [queryEl, setQueryEl] = useState(null)

    // when the component mounts, set the text in the contenteditable div to 'init text'
    useEffect(() => {
        const el = queryEl ? queryEl : queryRef.current
        setQueryEl(el)
        el.innerText = 'Your question goes here...'
    }, [queryEl])

    // when the user types in the contenteditable div, update the query state
    useEffect(() => {
        const el = queryEl ? queryEl : queryRef.current
        el.addEventListener('input', (e) => {
            setQuery(e.target.innerText)
        })
    }, [queryEl, setQuery])

    // after the response stream has finished loading, remove the stream-flash class from all the spans so that the animation doesn't play again when the user clicks on the tab
    useEffect(() => {
        if (responseStream && responseStream.length > 0 && loading === false) {
            const spans = document.querySelectorAll('.stream-flash')
            spans.forEach((span, index) => {
                span.classList.remove('stream-flash')
            })
        }
    }, [responseStream, loading])

    return (
        <div className={`w-full flex flex-col h-full border-gray-200 dark:border-gray-800 shadow-left overflow-clip
        ${props.activeTab === 2 ? 'hidden' : ''} fade-in`}>
            <div className='dark:text-gray-300 pt-10 pb-12 md:px-24 py-12 h-full leading-7 outline-none overflow-scroll'>
                <p
                    ref={queryRef}
                    contentEditable={true}
                    minLength='0'
                    className='outline-none text-blue-500 text-lg border-2 p-4 rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 mb-12'
                    suppressContentEditableWarning={true}
                />
                <div className='my-6 font-merry'>
                    {loadingStream ?
                        <p>Loading...</p> :
                        responseStream && responseStream.map((item, index) => {
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
                        })
                    }
                </div>

            </div>
            <div className='flex flex-row justify-between border-t-2 mt-[1px] border-gray-200 dark:border-gray-800 px-6 pb-6 pt-4'>
                {!loading ?
                    <button
                        className={'bg-purple-500 text-white font-medium py-3 px-4 w-36 rounded-xl hover:scale-[1.01] hover:bg-purple-400 mr-3 dark:bg-purple-800 dark:hover:bg-purple-700'}
                        onClick={() => handleClick()}
                        disabled={loading}
                    >
                        Generate
                    </button> :
                    <button
                        className={
                            loading ?
                                'bg-red-500 text-white font-medium py-3 px-4 w-36 rounded-lg hover:scale-[1.01] hover:bg-red-400 mr-4 dark:bg-red-600 dark:hover:bg-red-500' :
                                'bg-gray-300 text-gray-500 font-medium py-3 px-4 w-36 rounded-lg mr-4 dark:bg-gray-600'}
                        disabled={!loading}
                    >
                        Cancel
                    </button>}
            </div>
        </div>
    )
}