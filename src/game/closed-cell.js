import React, { useContext } from 'react';

import './game.css';

import { MachineContext } from './index';

import { getVersion } from './utils';


function ClosedCell(props) {
    const { row, col, marked } = props;
    const [_, send] = useContext(MachineContext);

    const onClick = () => {
        send('OPEN', { row, col });
    }

    const rightClick = (evt) => {
        evt.preventDefault();
        send('MARK', { row, col });
    }

    const ver = getVersion(row, col);
    const cellCls = `cell${ver}`;

    return (
        <div className={`cell ${cellCls}`}
            onClick={onClick}
            onContextMenu={rightClick}>
            {marked &&
                <i className="fas fa-flag"></i>
            }
        </div>
    )
}

export default ClosedCell;