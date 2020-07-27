import React, { useEffect, createPortal } from 'react';

const Portal = (props) => {
    const { children } = props;

    const mount = document.getElementById('portal');
    const element = document.createElement('div');

    useEffect(() => {
        mount.appendChild(element);
        return () => mount.removeChild(element);
    },[element, mount]);

    return (
        createPortal(children, element)
    )
}

export default Postal;