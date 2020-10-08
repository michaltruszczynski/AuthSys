import { useRef, useEffect, useState } from 'react';

const useSetTooltipPosition = (node) => {
    const [visible, setVisible] = useState(true); // tooltip visible true/false
    const [tooltipWidth, setTooltipWidth] = useState(0); // stores tooltip width as a marker for reference; value used to check if tooltip fits on screen
    const tooltipRef = useRef(); // tooltip ref

    useEffect(() => {

        const handleTooltipPosition = () => {
            // elements not yet mounted
            if (!node.current && !tooltipRef.current) return;

            //both elements visible, checks when tooltip should hide
            if ((node.current && tooltipRef.current)) {
                const { right: nodeRight, top: nodeTop } = node.current.getBoundingClientRect();
                const { width: tooltipRefWidth } = tooltipRef.current.getBoundingClientRect();

                const tooltipPosition = {
                    top: nodeTop + window.scrollY,
                    left: nodeRight
                }

                console.log(tooltipPosition.top);

                tooltipRef.current.style.top = tooltipPosition.top + 'px';
                tooltipRef.current.style.left = tooltipPosition.left + 'px';

                if (!tooltipWidth) {
                    const tootltipFits = tooltipRefWidth * 1.06 < window.innerWidth - nodeRight ? true : false;
                    if (tootltipFits !== visible) {
                        setVisible(tootltipFits);
                        setTooltipWidth(tooltipRefWidth);
                    }
                }
            }

            // tooltip not visible/not rendered, checks when tooltip should be visble
            if ((node.current && !tooltipRef.current)) {
                const { right: nodeRight } = node.current.getBoundingClientRect();
                if (tooltipWidth) {
                    let tootltipFits = tooltipWidth * 1.06 < window.innerWidth - nodeRight ? true : false;
                    if (tootltipFits !== visible) {
                        setVisible(tootltipFits);
                        setTooltipWidth(0);
                    }
                }
            }

            if ((!node.current && tooltipRef.current)) return;

        }

        handleTooltipPosition();

        window.addEventListener('resize', handleTooltipPosition);

        return () => window.removeEventListener('resize', handleTooltipPosition);
    });

    return [tooltipRef, visible];
}

export default useSetTooltipPosition;

// import { useRef, useLayoutEffect } from 'react'

// const useSetTooltipPosition = (node) => {
//     const tooltipRef = useRef();

//     useLayoutEffect(() => {

//         const handleTooltipPosition = () => {
//             if (!node.current) return;
//             if (!tooltipRef.current) return;

//             const elementPosition = node.current.getBoundingClientRect();
//             const { width: elementWidth, top: elementTop, left: elementLeft } = elementPosition;

//             const tooltipPosition = {
//                 top: elementTop + window.scrollY,
//                 left: elementLeft + elementWidth
//             }

//             tooltipRef.current.style.top = tooltipPosition.top + 'px';
//             tooltipRef.current.style.left = tooltipPosition.left + 'px';
//         }

//         handleTooltipPosition();

//         window.addEventListener('resize', handleTooltipPosition);

//         return () => window.removeEventListener('resize', handleTooltipPosition);
//     });

//     return [tooltipRef];
// }

// export default useSetTooltipPosition;