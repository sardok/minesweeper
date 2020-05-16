import React, { useContext } from 'react';

import { MachineContext } from './index';

import './game.css'

function RemainingMarkers() {
    const [state] = useContext(MachineContext);
    const { markerCount } = state.context;

    return (
        <div className="marker_count">
            <i className="fa fa-flag"></i>
            {markerCount}
        </div>
    );
}

export default RemainingMarkers;