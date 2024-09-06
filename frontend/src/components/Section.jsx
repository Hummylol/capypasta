import React from 'react';
import { useNavigate } from 'react-router-dom';

const Section = () => {
    const navigate = useNavigate();

    const handleButtonClick = (subject) => {
        navigate(`/all-notes/${subject}`);
    };

    return (
        <>
            <div className="section-container">
                <button onClick={() => handleButtonClick('IP')}>IP</button>
                <button onClick={() => handleButtonClick('MAD')}>MAD</button>
            </div>
            <button className="all-notes" onClick={() => navigate('/')}>ADD NOTE</button>
        </>
    );
};

export default Section;
