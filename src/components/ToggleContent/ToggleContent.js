import React, { useEffect, useRef } from 'react';

const ToggleContent = ({ show, children }) => {
    const contentContainerRef = useRef();

    useEffect(() => {
        const checkeElementDimensions = () => {
            if (!contentContainerRef) return;

            const coordsRefEl = contentContainerRef.current.getBoundingClientRect();

            const { height } = coordsRefEl;

        }
        checkeElementDimensions();

    })

    return (
        <div ref={contentContainerRef}>
            {children}
        </div>
    )
}

export default ToggleContent;