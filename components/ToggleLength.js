import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

const ToggleGroupDemo = (props) => (
    <ToggleGroup.Root
        className="ToggleGroup"
        type="single"
        defaultValue="longer"
        aria-label="Text alignment"
        onValueChange={(v) => {
            if (v) {
                props.setSelectedLength(v);
            }
        }}
        value={props.selectedLength}
    >
        <ToggleGroup.Item className="ToggleGroupItem" value="shorter" aria-label="Left aligned">
            shorter
        </ToggleGroup.Item>
        <ToggleGroup.Item className="ToggleGroupItem" value="longer" aria-label="Right aligned">
            longer
        </ToggleGroup.Item>
    </ToggleGroup.Root>
);

export default ToggleGroupDemo;