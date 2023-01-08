import React, { useEffect, useState } from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressDemo = (props) => {
    const [estDuration, setEstDuration] = useState(0);

    useEffect(() => {
        if (props.selectedLength === "longer") {
            setEstDuration(15);
        } else {
            setEstDuration(6);
        }
    }, [props.selectedLength])

    // useEffect(() => {
    //     console.log(props.elapsedTime)
    // }, [props.elapsedTime])


    const ratio = props.elapsedTime / estDuration;
    console.log(ratio)

    getElement

    return (
        <Progress.Root className="ProgressRoot">
            <Progress.Indicator
                className="ProgressIndicator"
                style={{
                    transform: `translateX(-${100 - ratio}%)`
                }}
            />
        </Progress.Root>
    )
}

export default ProgressDemo;
