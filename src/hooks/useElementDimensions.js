import { useRef, useState, useEffect } from 'react';

const useElementDimensions = () => {
    const ref = useRef();
    const [dimensions, setDimensions] = useState();

    useEffect(() => {
        if (!ref.current) return;
        console.log(ref.current.getBoundingClientRect().toJSON());
        setDimensions(ref.current.getBoundingClientRect().toJSON());
        console.log('testing........')

    }, [ref.current]);

    return [ref, dimensions];
}
export default useElementDimensions;