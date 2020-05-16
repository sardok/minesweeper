import React, { useContext } from 'react';

import { makeStateKey } from './statechart';

import { MachineContext } from './index';

import { getVersion } from './utils';

import './game.css'

function OpenCell(props) {
    const { row, col } = props;

    const key = makeStateKey(row, col);
    const [state] = useContext(MachineContext);
    const { content }= state.meta[key];
    const ver = getVersion(row, col);

    return (
        <div className={`cell cell_open${ver}`}>
            {content}
        </div>
    );
}

export default OpenCell;