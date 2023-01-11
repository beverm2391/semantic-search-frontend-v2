import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

const ToggleGroupDemo = (props) => (
    <ToggleGroup.Root
        className="ToggleGroup"
        type="single"
        defaultValue="thoughtful"
        aria-label="Text alignment"
        onValueChange={(v) => {
            if (v) {
                props.setSelectedTemp(v);
            }
        }}
        value={props.selectedTemp}
    >
        <ToggleGroup.Item className="ToggleGroupItem" value="factual" aria-label="Left aligned">
            factual
        </ToggleGroup.Item>
        <ToggleGroup.Item className="ToggleGroupItem" value="thoughtful" aria-label="Right aligned">
            thoughtful
        </ToggleGroup.Item>
    </ToggleGroup.Root>
);

export default ToggleGroupDemo;