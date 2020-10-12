import { randomBetween } from "../Helper/AlgorithmHelper";

export const O = {
    HORIZONTAL: 1, 
    VERTICAL: 0,
}

export const generateRecursiveDivision = (props, orientation = null) => {
    const grid = props.grid;

    if (!grid) return null;

    const horizontalWalls = extractOrientedWallNodes('H', grid, 2, 2, grid.length - 1, grid[0].length - 1);
    const verticalWalls = extractOrientedWallNodes('V', grid, 2, 2, grid[0].length - 1, grid.length - 1);

    const walls = divideWalls(orientation, grid, 0, Infinity, 0, Infinity, [], horizontalWalls, verticalWalls);
    console.log(walls.length);

    return {
        walls: walls,
    }
}

export const divideWalls = (grid = [], x, y, width, height, orientation, walls) => {
    if (width < 2 || height < 2) return walls;

    const horizontal = orientation === O.HORIZONTAL;

    const wx = x + (horizontal ? 0 : randomBetween(0, width - 2));
    const wy = y + (horizontal ? randomBetween(0, height - 2) : 0);

    const px = wx + (horizontal ? randomBetween(0, width) : 0);
    const py = wy + (horizontal ? 0 : randomBetween(0, height));

    const dx = horizontal ? 1 : 0;
    const dy = horizontal ? 0 : 1;

    // if (orientation === 'H') {
    //     r2 = r2 === Infinity ? horizontalWalls.length : r2;
    //     const i = randomBetween(r1, r2);

    //     c2 = c2 === Infinity ? horizontalWalls[i].length : c2;
    //     const removedAt = randomBetween(c1, c2);

    //     for (let j = c1; j < c2; j++) {
    //         const node = grid[i][j];

    //         if (node.start || node.end || j === removedAt) continue;

    //         walls.push(node);
    //     }
    //     const w1 = divideWalls('V', grid, r1, i, c1, removedAt, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w1)];
    //     const w2 = divideWalls('V', grid, r1, i, removedAt + 1, verticalWalls.length, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w2)];
    //     const w3 = divideWalls('V', grid, i + 1, horizontalWalls.length, c1, removedAt, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w3)];
    //     const w4 = divideWalls('V', grid, i + 1, horizontalWalls.length, removedAt + 1, verticalWalls.length, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w4)];
    // }

    // if (orientation === 'V') {
    //     c2 = c2 === Infinity ? verticalWalls.length : c2;
    //     const j = randomBetween(c1, c2);

    //     r2 = r2 === Infinity ? verticalWalls[j].length : r2;
    //     const removedAt = randomBetween(r1, r2);

    //     for (let i = r1; i < r2; i++) {
    //         const node = grid[i][j];

    //         if (node.start || node.end || i === removedAt) continue;

    //         walls.push(node);
    //     }
    //     const w1 = divideWalls('H', grid, r1, removedAt, c1, j, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w1)];
    //     const w2 = divideWalls('H', grid, removedAt + 1, horizontalWalls.length, c1, j, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w2)];
    //     const w3 = divideWalls('H', grid, r1, removedAt, j + 1, verticalWalls.length, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w3)];
    //     const w4 = divideWalls('H', grid, removedAt + 1, horizontalWalls.length, removedAt + 1, verticalWalls.length, walls, horizontalWalls, verticalWalls);
    //     walls = [...walls, ...filterWalls(walls, w4)];
    // }

    return walls;
}

export const extractOrientedWallNodes = (orientation, grid, r1, c1, r2, c2) => {
    const nodes = [];
    let index = -1;
    for (let i = r1; i < r2; i += 2) {
        nodes.push([]);
        index += 1;
        for (let j = c1; j < c2; j++) {
            switch (orientation) {
                case 'H':
                    nodes[index].push(grid[i][j]);
                    break;
                case 'V':
                    nodes[index].push(grid[j][i]);
                    break;
                default:
                    break;
            }
        }
    }
    return nodes;
}

export const filterWalls = (walls = [], W = []) => {
    const result = [];
    for (const w of W) {
        if (!walls.includes(w)) {
            result.push(w);
        }
    }
    return result;
}

export const chooseOrientation = (width = 0, height = 0) => {
    if (width < height) {
        return O.HORIZONTAL;
    }
    else if (width > height) {
        return O.VERTICAL;
    }
    else {
        return randomBetween(0, 2) === 0 ? O.HORIZONTAL : O.VERTICAL;
    }
}