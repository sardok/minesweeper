import React, { useContext } from 'react';

import './game.css';

import { MachineContext } from './index';


function CloseCell(props) {
    const { row, col } = props;
    const [_, send] = useContext(MachineContext);

    const onClick = () => send('OPEN', { row, col });

    return (
        <div className="cell"
            onClick={onClick}>
            Closed
        </div>
    )
}

export default CloseCell;