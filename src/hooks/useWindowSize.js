import React from 'react';

const useWindowRSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: null,
        height: null
    });

    useEffect(() => {
        function handleResize () {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return windowSize
}

export default useWindowRSize;