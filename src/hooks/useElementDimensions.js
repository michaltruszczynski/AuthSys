import { useEffect, useState } from 'react';

const useElementDimensions = (node) => {
    const [dimensions, setDimensions] = useState();

    useEffect(() => {

        const handleElementDimensions = () => {
            if (!node) return;

            setDimensions(node.current.getBoundingClientRect().toJSON());
        }

        handleElementDimensions();
        window.addEventListener('resize', handleElementDimensions);

        return () => window.removeEventListener('resize', handleElementDimensions);
    }, [node]);

    return [dimensions];
}
export default useElementDimensions;