import React, { useContext } from 'react';

import { makeStateKey } from './statechart';

import { MachineContext } from './index';

import OpenCell from './open-cell';
import CloseCell from './close-cell';
import BombCell from './bomb-cell';
import EmptyCell from './empty-cell';

import './game.css'

function Cell(props) {
    const { row, col } = props;

    const [state] = useContext(MachineContext);

    const key = makeStateKey(row, col);

    switch(true) {
        case state.matches({ [key]: 'open' }):
            return <OpenCell row={row} col={col} />
        case state.matches({ [key]: 'close' }):
            return <CloseCell row={row} col={col} />
        case state.matches({ [key]: 'bomb' }):
            return <BombCell />;
        case state.matches({ [key]: 'empty' }):
            return <EmptyCell row={row} col={col} />;
        default:
            return null;
    }
}

export default Cell;