import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>My cool content here!</div>
    );
});



const Example = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <ComponentToPrint ref={componentRef} />
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    );
};

export default Example