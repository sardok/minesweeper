import React, { useContext } from 'react';

import { makeStateKey } from './statechart';

import { MachineContext } from './index';

import './game.css'

function OpenCell(props) {
    const { row, col } = props;

    const key = makeStateKey(row, col);
    const [state] = useContext(MachineContext);
    const { content }= state.meta[key];

    return (
        <div className="cell">
            {content}
        </div>
    );
}

export default OpenCell;