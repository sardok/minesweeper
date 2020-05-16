import React from 'react';

import { getVersion } from './utils';

import './game.css';

function BombCell(props) {
    const { row, col } = props;
    const ver = getVersion(row, col);

    return (
        <div className={`cell cell_open${ver}`} onClick={props.onClick}>
            <i className="fas fa-bomb" />
        </div>
    )
}

export default BombCell;