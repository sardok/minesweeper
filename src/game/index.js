import React from 'react';

import { useMachine } from '@xstate/react';

import { statechart } from './statechart';

import Cell from './cell';

import './game.css';

export const MachineContext = React.createContext();

function Game(props) {
    const machine = useMachine(statechart);

    const rows = [];
    for (let i = 0; i < props.size; i++) {
        const cells = [];
        for (let j = 0; j < props.size; j++) {
            const cell = (<Cell row={i} col={j} key={`${i}_${j}`} />);
            cells.push(cell);
        }

        const row = (
            <div className="row" key={i}>
                {cells}
            </div>
        );
        rows.push(row);
    }



    return (
        <MachineContext.Provider value={machine}>
            <div className="game">
                {rows}
            </div>
        </MachineContext.Provider>
    );
}

export default Game;