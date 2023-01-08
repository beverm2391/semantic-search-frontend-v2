import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

const ToggleGroupDemo = () => (
    <ToggleGroup.Root
        className="ToggleGroup"
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
    >
        <ToggleGroup.Item className="ToggleGroupItem" value="left" aria-label="Left aligned">
            shorter
        </ToggleGroup.Item>
        {/* <ToggleGroup.Item className="ToggleGroupItem" value="center" aria-label="Center aligned">
            <TextAlignCenterIcon />
        </ToggleGroup.Item> */}
        <ToggleGroup.Item className="ToggleGroupItem" value="right" aria-label="Right aligned">
            longer
        </ToggleGroup.Item>
    </ToggleGroup.Root>
);

export default ToggleGroupDemo;