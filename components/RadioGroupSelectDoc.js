import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

function RadioGroupSelectDoc(props) {
    const documents = props.documents
    return (
        <form>
            <RadioGroup.Root className="RadioGroupRoot" defaultValue={documents[0]} aria-label="View density">
                {documents.map((document, index) => (
                    <div className='flex items-center' key={index}>
                        <RadioGroup.Item className="RadioGroupItem" value={document} id={`r${index}`}>
                            <RadioGroup.Indicator className="RadioGroupIndicator" />
                        </RadioGroup.Item>
                        <label className="Label hover:cursor-pointer hover:text-gray-400 font-merry" htmlFor={`r${index}`}>
                            {document}
                        </label>
                    </div>
                ))}
            </RadioGroup.Root>
        </form>
    );
}

export default RadioGroupSelectDoc;