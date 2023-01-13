import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const AccordionDemo = () => (
    <div className="AccordionWrapper">
        <Accordion.Root className="AccordionRoot" type="single" collapsible>
            <Accordion.Item className="AccordionItem" value="item-1">
                <AccordionTrigger>What is this thing?</AccordionTrigger>
                <AccordionContent>It&apos;s a tool that lets you ineract with a document using natural language.</AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                    It uses a combination of ML (sentence transformers) and AI (GPT-3) to find relevant parts of the document and
                    then generate a response.
                </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
                <AccordionTrigger>Can you train it on X ?</AccordionTrigger>
                <Accordion.Content className="AccordionContent">
                    <div className="AccordionContentText">
                        Yup! You can help me test it. Just <a href="mailto:ben@beneverman.com" className='underline text-blue-500'>shoot me an email</a>.
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    </div>
);

// const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
//     <Accordion.Header className="AccordionHeader">
//         <Accordion.Trigger
//             className={classNames('AccordionTrigger', className)}
//             {...props}
//             ref={forwardedRef}
//         >
//             {children}
//             <ChevronDownIcon className="AccordionChevron" aria-hidden />
//         </Accordion.Trigger>
//     </Accordion.Header>
// ));

const AccordionTrigger = React.forwardRef(function AccordionTrigger({ children, className, ...props }, forwardedRef) {
    return (
        <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger
                className={classNames('AccordionTrigger', className)}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
        </Accordion.Header>
    );
});


// const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
//     <Accordion.Content
//         className={classNames('AccordionContent', className)}
//         {...props}
//         ref={forwardedRef}
//     >
//         <div className="AccordionContentText">{children}</div>
//     </Accordion.Content>
// ));

const AccordionContent = React.forwardRef(function AccordionContent({ children, className, ...props }, forwardedRef) {
    return (
        <Accordion.Content
            className={classNames('AccordionContent', className)}
            {...props}
            ref={forwardedRef}
        >
            <div className="AccordionContentText">{children}</div>
        </Accordion.Content>
    );
});


export default AccordionDemo;