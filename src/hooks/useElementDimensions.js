import { useEffect, useState } from 'react';

const useElementDimensions = (node) => {
    // const [dimensions, setDimensions] = useState();
    let dimensions = 0;
    console.log('test')
    useEffect(() => {

        const handleElementDimensions = () => {
            console.log(node.current)
            if (!node) return;
            console.log(node.current.getBoundingClientRect().toJSON())
            // setDimensions(node.current.getBoundingClientRect().toJSON());
        }

        handleElementDimensions();
        window.addEventListener('resize', handleElementDimensions);

        return () => window.removeEventListener('resize', handleElementDimensions);
    }, [node]);

    return [dimensions];
}
export default useElementDimensions;