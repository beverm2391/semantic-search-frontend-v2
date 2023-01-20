import React, { useEffect, useState, useCallback } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { BsFolderFill } from 'react-icons/bs';
import { BsCloudCheckFill } from 'react-icons/bs';

function AccordianSelectDoc(props) {
    const folders = props.folders
    const [checked_id, setCheckedId] = useState('0-0');
    const setSelectedDoc = props.setSelectedDoc;

    // ! GET THE NAME OF THE SELECTED DOCUMENT ---------------------------------
    const getDocName = useCallback((checked, folders) => {
        if (checked) {
            const folder_number = (checked.split('-')[0])
            const doc_number = (checked.split('-')[1])
            setSelectedDoc(folders[folder_number]['content'][doc_number]);
        }
    }, [setSelectedDoc])

    useEffect(() => {
        getDocName(checked_id, folders);
    }, [checked_id, getDocName, folders])

    return (
        <div className="AccordionSelectDocWrapper">
            <Accordion.Root className="AccordionSelectDocRoot" type="single" collapsible>
                <RadioGroup.Root defaultValue='r1-1' aria-label="View density">
                    {folders.map((folder, idx1) => (
                        <Accordion.Item value={folder['name']} key={idx1}>
                            <AccordionTrigger className='font-medium font-lg text-gray-600 dark:text-gray-300 py-4 px-4 h-12'><BsFolderFill /><p className='ml-4 mr-2'>{folder['name']}</p></AccordionTrigger>
                            <AccordionContent>
                                {folder['content'].map((document, idx2) => (
                                    <div className={`flex items-center h-8 my-2 doc-item`} key={`${idx1}-${idx2}`}>
                                        <RadioGroup.Item
                                            value={`${idx1}-${idx2}`}
                                            id={`${idx1}-${idx2}`}
                                            checked={checked_id === `${idx1}-${idx2}`}
                                            onClick={() => setCheckedId(`${idx1}-${idx2}`)}
                                        >
                                            <RadioGroup.Indicator className="RadioGroupIndicator">
                                                <BsCloudCheckFill className="text-purple-500 dark:text-gray-200 h-4 w-4 mr-1" />
                                            </RadioGroup.Indicator>
                                        </RadioGroup.Item>
                                        <label className="Label hover:cursor-pointer text-gray-500 dark:text-gray-300 hover:text-purple-500 font-medium p-3 rounded-lg"
                                            htmlFor={`${idx1}-${idx2}`}>
                                            {document}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </Accordion.Item>
                    ))}
                </RadioGroup.Root>
            </Accordion.Root>
        </div>
    );
}

const AccordionTrigger = React.forwardRef(function AccordionTrigger({ children, className, ...props }, forwardedRef) {
    return (
        <Accordion.Header className="AccordionSelectDocHeader">
            <Accordion.Trigger
                className={classNames('AccordionSelectDocTrigger', className)}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon className="AccordionSelectDocChevron" aria-hidden />
            </Accordion.Trigger>
        </Accordion.Header>
    );
});

const AccordionContent = React.forwardRef(function AccordionContent({ children, className, ...props }, forwardedRef) {
    return (
        <Accordion.Content
            className={classNames('AccordionSelectDocContent', className)}
            {...props}
            ref={forwardedRef}
        >
            <div className="AccordionSelectDocContentText">{children}</div>
        </Accordion.Content>
    );
});


export default AccordianSelectDoc;