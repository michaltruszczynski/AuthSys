import React from 'react';

import { useEffect, useState } from 'react';

const useTooltipVisible = (leftNode, rightNode) => {
    const [visible, setVisible] = useState(true);
    const [marker, setMarker] = useState(0)

    useEffect(() => {

        const handleElementDimensions = () => {
            console.log('test')
            console.log('rightNode', rightNode)
            if (!leftNode.current && !rightNode.current) return;
            if ((leftNode.current && rightNode.current)) {
                const { width: leftNodeWidth, left: leftNodeLeft } = leftNode.current.getBoundingClientRect()
                const { width: rightNodeWidth, right: rightNodeRight } = rightNode.current.getBoundingClientRect()

                console.log(rightNodeWidth * 1.02, leftNodeLeft)
                // let vis = rightNodeRight * 1.02 < window.innerWidth ? true : false;
                console.log('marker', marker)
                if (!marker) {
                    console.log('test1')
                    let vis = rightNodeWidth * 1.02 < leftNodeLeft ? true : false;
                    if (vis !== visible) {
                        setVisible(vis);
                        setMarker(rightNodeWidth);
                    }
                    console.log(vis);
                } else {
                    console.log('test2')
                    let vis = marker * 1.02 > leftNodeLeft ? true : false;
                    if (vis !== visible) {
                        setVisible(vis);
                        setMarker(0);
                    }
                    console.log(vis);
                }

            }
            if ((leftNode.current && !rightNode.current) ) {
                const { width: leftNodeWidth, left: leftNodeLeft } = leftNode.current.getBoundingClientRect()
                if (marker)  {
                    console.log('test2')
                    let vis = marker * 1.02 < leftNodeLeft ? true : false;
                    if (vis !== visible) {
                        setVisible(vis);
                        setMarker(0);
                    }
                    console.log(vis);
                }
            }
        }
        console.log('visible', visible);
        handleElementDimensions();
        window.addEventListener('resize', handleElementDimensions);

        return () => window.removeEventListener('resize', handleElementDimensions);
    },[marker]);

    return [visible];
}
export default useTooltipVisible;