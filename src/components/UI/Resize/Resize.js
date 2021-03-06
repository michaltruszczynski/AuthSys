import React, { useEffect, useState } from 'react';

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null;
            fn.call(this, arguments)
        }, ms);
    }
}

const Resize = () => {

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        function handleResize() {
            // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }

        window.addEventListener('resize', handleResize);
        console.log(dimensions);
        return () => {
            window.removeEventListener('resize', handleResize);
            console.log('cleaning')
        }
    })
    return (
        <div>Rendered at {dimensions.width} x {dimensions.height}</div>
    )
}

export default Resize;