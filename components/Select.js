import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import axios from 'axios';

const testdata = ["Book", "Document", "Image", "Video", "Audio", "Other"];

const SelectDemo = (props) => (
    <Select.Root
        value={props.selectedDoc}
        onValueChange={v => props.setSelectedDoc(v)}
    >
        <Select.Trigger className="SelectTrigger" aria-label="documents">
            <Select.Value
                placeholder="Select a document..."
                className='selectValue'
            />
            <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    <Select.Group>
                        <Select.Label className="SelectLabel">Encoded Documents</Select.Label>
                        {props.docs && props.docs.map((item) => (
                            <SelectItem key={item} value={item} className="SelectItem">
                                {item.length > 20 ? `${item.substring(0, 20)}...` : item}
                            </SelectItem>
                        ))}
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

SelectItem.displayName = 'SelectItem';
export default SelectDemo;