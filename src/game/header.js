import React from 'react';

import RemainingMarkers from './remaining-markers';
import ElapsedTime from './elapsed-time';

import './game.css';

function Header() {

    return (
        <div className="header">
            <RemainingMarkers />
            <ElapsedTime />
        </div>
    );
}

export default Header;