import React, { useRef, useEffect } from 'react'

const useTooltip = () => {
    const elementRef = useRef();
    const tooltipRef = useRef();


    useEffect(() => {
        const handleTooltipPosition = () => {
            if (!elementRef.current) return;
            if (!tooltipRef.current) return;

            const elementPosition = elementRef.current.getBoundingClientRect();
            const { width: elementWidth, top: elementTop, left: elementLeft } = elementPosition;

            const tooltipCoords = {
                top: elementTop + window.scrollY,
                left: elementLeft + elementWidth
            }

            tooltipRef.current.style.top = tooltipCoords.top + 'px';
            tooltipRef.current.style.left = tooltipCoords.left + 'px';
        };

        handleTooltipPosition()
        window.addEventListener('resize', handleTooltipPosition);
        return () => window.removeEventListener('resize', handleTooltipPosition);
    }, []);

    return [tooltipRef, elementRef];
}

export default useTooltip;