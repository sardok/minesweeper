import React, { useEffect, useState, useContext, useCallback } from 'react';

import { MachineContext } from './index';

import './game.css';

let HANDLER = 0;

function ElapsedTime() {
    const [elapsed, setElapsed] = useState(0);

    const zeroPad = (num, places) => String(num).padStart(places, '0');

    const [state] = useContext(MachineContext);
    const { gameOver } = state.context;

    const stop = useCallback(() => {
        clearInterval(HANDLER);
        HANDLER = 0;
    }, [HANDLER]);

    useEffect(() => {
        if (state.changed && HANDLER === 0) {
            HANDLER = setInterval(() => {
                setElapsed(e => e + 1);
            }, 1000);

            return () => stop();
        }
    }, [state.changed, stop]);

    if (gameOver) {
        stop();
    }

    return (
        <div className="elapsed_time">
            <i className="fas fa-stopwatch">

            </i>
            {zeroPad(elapsed, 3)}
        </div>
    )
}

export default ElapsedTime;