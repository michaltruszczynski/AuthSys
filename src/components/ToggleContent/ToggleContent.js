import React, { useRef, useEffect } from 'react';

import styles from './toggleContent.module.css'

const ToggleContent = ({ show, children }) => {
    const contentContainerRef = useRef();
    console.log(contentContainerRef)
    useEffect(() => {
        console.log(contentContainerRef)
    }, []);

    useEffect(() => {
    const checkeElementDimensions = () => {
        if (!contentContainerRef) return;

        const coordsRefEl = contentContainerRef.current.getBoundingClientRect();

        const { height } = coordsRefEl;
        contentContainerRef.current.style.height = height + 'px';
    }
    checkeElementDimensions();

        const setHeight = () => {
            let height = 0;
            if (show) {
                if (!contentContainerRef) return;

                const coordsRefEl = contentContainerRef.current.getBoundingClientRect();

                const { heighte } = coordsRefEl;
                height = heighte
                console.log(height)
                contentContainerRef.current.style.height = heighte + 'px';
            } else {
                contentContainerRef.current.style.height = height + 'px';
            }


        }
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