import React from 'react';

import { getVersion } from './utils';

import './game.css'

function EmptyCell(props) {
    const { row, col } = props;
    const ver = getVersion(row, col);

    return (
        <div className={`cell cell_open${ver}`}>
        </div>
    );
}

export default EmptyCell;