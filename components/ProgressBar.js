import React, { useEffect } from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressDemo = (props) => {    
    return (
        <Progress.Root className="ProgressRoot" value={66}>
            <Progress.Indicator
                className="ProgressIndicator"
                style={{ transform: `translateX(-${100 - props.progress}}%)` }}
            />
        </Progress.Root>
    );
};

export default ProgressDemo;
