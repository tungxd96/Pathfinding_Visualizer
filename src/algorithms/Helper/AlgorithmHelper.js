import Node from "../../objects/Node";

export const setInitialNodes = (grid) => {
    var row = parseInt(grid.length / 2);
    if (row % 2 === 0) {
        row -= 1;
    }
    const startCol = parseInt(grid[0].length / 4);
    const endCol = parseInt(grid[0].length * 0.75);

    const startNode = grid[row][startCol];
    startNode.start = true;
    const endNode = grid[row][endCol];
    endNode.end = true;

    return {
        startNode: startNode,
        endNode: endNode,
    }
}

export const calculateCost = (currentNode = new Node(), targetNode = new Node()) => {
    const dstX = Math.abs(currentNode.position.col - targetNode.position.col);
    const dstY = Math.abs(currentNode.position.row - targetNode.position.row);

    if (dstX > dstY)
        return 14 * dstY + 10 * (dstX - dstY);
    return 14 * dstX + 10 * (dstY - dstX);
}

export const findNeighbors = (grid, currentNode = new Node()) => {
    let neighbors = [];
    const x = currentNode.position.col, y = currentNode.position.row;

    for (var i = y - 1; i <= y + 1; i++) {
        for (var j = x - 1; j <= x + 1; j++) {
            if (i === y && j === x) {
                continue;
            }

            if (Math.abs(i - y) === 1 && Math.abs(j - x) === 1) {
                continue;
            }

            let neighborNode = null;
            try {
                neighborNode = grid[i][j];
            }
            catch {
                neighborNode = null;
            }
            if (neighborNode) {
                neighbors.push(neighborNode);
            }
        }
    }

    return neighbors;
}

export const findMazeNeighbors = (grid, currentNode = new Node()) => {
    let neighbors = [];
    const x = currentNode.position.col, y = currentNode.position.row;

    for (var i = y - 2; i <= y + 2; i++) {
        for (var j = x - 2; j <= x + 2; j++) {
            if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[0].length - 1) continue;
            if ((Math.abs(i - y) === 2 && Math.abs(j - x) === 0) || (Math.abs(i - y) === 0 && Math.abs(j - x) === 2)) {
                let neighborNode = null;
                try {
                    neighborNode = grid[i][j];
                }
                catch {
                    neighborNode = null;
                }
                if (neighborNode) {
                    neighbors.push(neighborNode);
                }
            }
        }
    }

    return neighbors;
}

export const neighborNodePosition = (currentNode = new Node(), neighborNode = new Node()) => {
    const x = currentNode.position.col - neighborNode.position.col;
    const y = currentNode.position.row - neighborNode.position.row;
    
    const left = x === 1 && neighborNode.wall;
    const right = x === -1 && neighborNode.wall;
    const top = y === 1 && neighborNode.wall;
    const bottom = y === -1 && neighborNode.wall;

    if (left) return { left };
    if (right) return { right };
    if (top) return { top };
    if (bottom) return { bottom };

    return null;
}

export const randomizedNeighbor = neighbors => {
    const rand = randomBetween(0, neighbors.length);
    return neighbors[rand];
}

export const randomBetween = (from = 0, to = 1) => {
    return Math.floor(Math.random() * (to - from)) + from;
}

export const neighborsHasUnvisitedNode = (neighbors, visited) => {
    for (const n of neighbors) {
        if (!visited[key(n)]) {
            return true;
        }
    }
    return false;
}

export const removeNodeFrom = (list = [], node = new Node()) => {
    const newList = list.filter((item) => item.position !== node.position);
    return newList;
}

export const nodeIncludes = (list, node = new Node()) => {
    for (const child of list) {
        if (child.position.row === node.position.row && child.position.col === node.position.col) {
            return true;
        }
    }
    return false;
}

export const positionIncludes = (list, position) => {
    for (const child of list) {
        if (child) {
            if (child.row !== null && child.col !== null) {
                if (position.row === child.row && position.col === child.col) {
                    return true;
                }
            }
        }
    }
    return false;
}

export const clearGridExcludes = (grid, excludeNodes) => {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (positionIncludes(excludeNodes, { row: i, col: j })) {
                continue;
            }
            grid[i][j].reset();
        }
    }
    return grid;
}

export const clearAll = (grid) => {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            const node = grid[i][j];
            node.reset();
            document.getElementById(id(node)).className = 'cell disable-selection node outline';
        }
    }
    return grid;
}

export const cleanVisualization = visualization => {
    if (visualization) {
        const visited = visualization.visited;
        const path = visualization.path;
        if (visited) {
            for (const node of visited) {
                node.visited = false;
                node.parent = null;
                document.getElementById(id(node)).className = 'cell disable-selection node';
                if (node.wall) {
                    document.getElementById(id(node)).className = 'cell disable-selection node wall';
                }

            }
        }
        if (path) {
            for (const node of path) {
                node.path = false;
                node.parent = null;
                document.getElementById(id(node)).className = 'cell disable-selection node';
                if (node.wall) {
                    document.getElementById(id(node)).className = 'cell disable-selection node wall';
                }
            }
        }
    }
    return;
}

export const clearMaze = maze => {
    if (maze) {
        if (maze.walls) {
            for (const node of maze.walls) {
                node.wall = false;
                document.getElementById(id(node)).className = 'cell disable-selection node';
            }
        }
    }
    return;
}

export const clearGrid = (grid) => {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            grid[i][j].reset();
            grid[i][j].clean = true;
        }
    }
    return grid;
}

export const round = (num, decimal = 2) => {
    const decimalNumber = Math.pow(10, decimal);
    return Math.round((num + Number.EPSILON) * decimalNumber) / decimalNumber;
}

export const key = (node = new Node()) => {
    return `${node.position.row}-${node.position.col}`;
}

export const id = (node = new Node()) => {
    return `cell-${node.position.row}-${node.position.col}`;
}

export const reconstructFinalPathFromParent = (startNode = new Node(), endNode = new Node()) => {
    let path = [];
    let currentNode = endNode;
    while (currentNode.parent !== null) {
        path = [currentNode, ...path];
        currentNode = currentNode.parent;
    }
    path = [startNode, ...path];
    return path;
}

export const reconstructFinalPathFromMap = (prev = new Map(), startNode = new Node(), endNode = new Node()) => {
    let path = [endNode];
    let currentNode = prev[key(endNode)];

    while (currentNode !== startNode) {
        path = [currentNode, ...path];
        currentNode = prev[key(currentNode)];
    }
    path = [startNode, ...path];

    return path;
}