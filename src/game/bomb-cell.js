import React from 'react';

import './game.css';

function BombCell(props) {
    return (
        <div className="cell"
            onClick={props.onClick}>
            Bomb!
        </div>
    )
}

export default BombCell;