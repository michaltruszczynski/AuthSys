import React, { useRef, useLayoutEffect } from 'react';

import styles from './toggleContent.module.css'

const ToggleContent = ({ show, children }) => {
    const contentContainerRef = useRef();

    useLayoutEffect(() => {
        const checkeElementDimensions = () => {
            if (!contentContainerRef) return;

            const coordsRefEl = contentContainerRef.current.getBoundingClientRect();

            const { height } = coordsRefEl;
            contentContainerRef.current.style.height = height + 'px';
        }

        const setHeight = () => {
            let height = 0;
            if (show) {
                if (!contentContainerRef) return;

                const coordsRefEl = contentContainerRef.current.getBoundingClientRect();

                const { height } = coordsRefEl;

                contentContainerRef.current.style.height = height + 'px';
            } else {
                contentContainerRef.current.style.height = height + 'px';
            }

        }

        checkeElementDimensions();
        setHeight();

    }, [show])

    const getWrapperStyle = () => {
        return show && contentContainerRef.current ? { height: contentContainerRef.current.scrollHeight + 'px' } : { height: '0' }
    }

    return (
        <div className={styles['toggle-container']} style={getWrapperStyle()}>
            <div ref={contentContainerRef}>
                {children}
            </div>
        </div>
    )
}

export default ToggleContent;