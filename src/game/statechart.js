import { Machine, send } from 'xstate';

import { makeField } from './utils';

const targetMatches = (_, event, { cond }) => {
    const { row, col } = cond;
    return row === event.row && col === event.col;
}

const isAdj = (_, event, { cond }) => {
    const { row, col } = cond;
    const dx = Math.abs(event.col - col);
    const dy = Math.abs(event.row - row);
    const res = dx <= 1 && dy <= 1;

    return res;
}

const contentMatches = (_, __, { cond }) => {
    const { content, expected } = cond;
    return content === expected;
};

const targetAndContentMatches = (context, event, condMeta) => {
    const res = targetMatches(context, event, condMeta) &&
        contentMatches(context, event, condMeta);

    return res;
}

const isAdjAndContentMatches = (context, event, condMeta) => {
    return isAdj(context, event, condMeta) &&
        contentMatches(context, event, condMeta);
}

function makeCellState(id, row, col, content) {
    return {
        id,
        initial: 'close',
        states: {
            close: {
                on: {
                    OPEN: [
                        {
                            cond: {
                                type: 'targetAndContentMatches',
                                row, col, content, expected: 'bomb'
                            },
                            target: 'bomb',
                        },
                        {
                            cond: {
                                type: 'targetAndContentMatches',
                                row, col, content, expected: 'empty'
                            },
                            target: 'empty',
                        },
                        {
                            cond: {
                                type: 'targetMatches',
                                row, col
                            },
                            target: 'open',
                        }
                    ],
                    OPEN_BOMBS: [
                        {
                            cond: {
                                type: 'contentMatches',
                                content, expected: 'bomb'
                            },
                            target: 'bomb'
                        }
                    ],
                    OPEN_ALL: 'open',
                    OPEN_ADJ_EMPTY: [
                        {
                            cond: {
                                type: 'isAdjAndContentMatches',
                                row, col, content, expected: 'empty'
                            },
                            target: 'empty',
                        }
                    ]
                },
            },
            open: {
            },
            bomb: {
                entry: send('OPEN_BOMBS'),
            },
            empty: {
                entry: send({ type: 'OPEN_ADJ_EMPTY', row, col })
            },
        },
        meta: { content },
    }
}

export const makeStateKey = (row, col ) => `${row}_${col}`;

export function makeStatechart(size) {
    const states = {}
    const field = makeField(size, size);
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const stateKey = makeStateKey(i, j);
            const content = field[i][j];
            states[stateKey] = makeCellState(stateKey, i, j, content);
        }
    }

    return Machine(
        {
            id: 'gameStatechart',
            type: 'parallel',
            states: states,
        },
        {
            guards: { 
                contentMatches,
                targetMatches,
                targetAndContentMatches,
                isAdjAndContentMatches,
            }
        });
}

export const statechart = makeStatechart(5);