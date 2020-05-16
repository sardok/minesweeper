export function getRandomContent() {
    if (Math.random() <= 0.3) {
        return 'bomb';
    }

    return 'empty';
}


function* getAdj(i, j, maxCol, maxRow) {
    const left = j - 1 >= 0
        ? j - 1 : NaN;
    const right = j + 1 < maxCol
        ? j + 1 : NaN;
    const above = i - 1 >= 0
        ? i - 1 : NaN;
    const below = i + 1 < maxRow
        ? i + 1 : NaN;
    const adjMap = [
        [above, left], [above, j], [above, right],
        [i, left], [i, right],
        [below, left], [below, j], [below, right]
    ];

    for(const adj of adjMap) {
        const [x, y] = adj;
        if (!isNaN(x) && !isNaN(y)) {
            yield adj;
        }
    }
}

function getAdjBombCount(i, j, field) {
    const adjs = [...getAdj(i, j, field[0].length, field.length)];
    const counts = adjs.map(([row, col]) => field[row][col] === 'bomb' ? 1: 0);
    return counts.reduce((acc, cur) => acc + cur, 0);
}

export function makeField(row, col) {
    const field = [];
    for (let i = 0; i < row; i++) {
        const row = [];
        for (let j = 0; j < col; j++) {
            const content = getRandomContent();
            row.push(content);
        }

        field.push(row);
    }

    // Update empty contents to hold number of adj bombs.
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (field[i][j] === 'empty') {
                const adjBombCnt = getAdjBombCount(i, j, field);
                if (adjBombCnt > 0) {
                    field[i][j] = `${adjBombCnt}`;
                }
            }
        }
    }

    return field;
}