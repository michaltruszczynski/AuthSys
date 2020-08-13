import React, { useState } from 'react';

import AccordinElement from './AccordionElement/AccordionElement';
import styles from './Accordion';

const Accordion = () => {

    const [accordions, setAccordions] = useState([
        {
            heading: 'How many programmers does it take to screw in a lightbulb?',
            text: 'None. We don\'t address hardware issues.',
            open: true
        },
        {
            heading: 'Who is the most awesome person?',
            text: 'You. The Viewer.',
            open: false
        },
        {
            heading: 'How many questions does it take to make a successful FAQ Page?',
            text: 'This many.',
            open: false
        }
    ]);

    return (
        <>
            {accordions.map((element, i) => {
                <AccordinElement key={i} content={element}/>
            })}
        </>
    )
}

export default Accordion;

