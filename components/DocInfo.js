import React, { useRef, useState } from 'react'


export default function DocInfoContainer(props) {
    const fileUploadRef = useRef(null)
    const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            setDocForUpload(e.target.files[0])
        }
    }

    const {
        docForUpload,
        setDocForUpload,
        uploadDoc,
        responseData,
    } = props;

    const context_pages = responseData && responseData['context_pages'] ? responseData['context_pages'] : null;
    const response_time = responseData && responseData['time'] ? responseData['time'] : null;

    return (
        <div className={`fade-in p-12 ${props.activeTab === 1 ? 'hidden' : ''}`}>
            <div className='stats-container p-4 w-96'>
                <button
                    className='inline-flex justify-center items-center mb-3 w-full bg-gray-50 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-600 border-gray-100 border-2 font-merry hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer text-gray-700 dark:text-gray-200'
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
        </div>
    )
}