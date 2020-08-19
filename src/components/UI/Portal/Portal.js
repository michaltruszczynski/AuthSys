import React, { useEffect } from 'react';
import {createPortal} from 'react-dom';

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

export default Portal;