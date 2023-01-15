import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { CheckCircledIcon, CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import RadioGroupSelectDoc from './RadioGroupSelectDoc';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { BsFolderFill } from 'react-icons/bs';

function AccordianSelectDoc(props) {
    const folders = props.folders
    return (
        <div className="AccordionSelectDocWrapper">
            <Accordion.Root className="AccordionSelectDocRoot" type="single" collapsible>
                <RadioGroup.Root defaultValue='r1-1' aria-label="View density">
                    {folders.map((folder, idx1) => (
                        <Accordion.Item value={folder['name']} key={idx1}>
                            <AccordionTrigger className='font-medium font-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 px-4 h-12'><BsFolderFill /><p className='ml-4 mr-2'>{folder['name']}</p></AccordionTrigger>
                            <AccordionContent>
                                {folder['content'].map((document, idx2) => (
                                    <div className='flex items-center h-8 my-2' key={`r${idx1}-${idx2}`}>
                                        <RadioGroup.Item value={`r${idx1}-${idx2}`} id={`r${idx1}-${idx2}`}>
                                            <RadioGroup.Indicator className="RadioGroupIndicator">
                                                {/* <CheckIcon className="text-gray-800 dark:text-gray-200" /> */}
                                            </RadioGroup.Indicator>
                                        </RadioGroup.Item>
                                        <label className="Label hover:cursor-pointer text-gray-500 dark:text-gray-300 hover:text-purple-500 font-medium p-3 rounded-lg"
                                            htmlFor={`r${idx1}-${idx2}`}>
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