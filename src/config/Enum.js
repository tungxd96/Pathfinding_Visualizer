export const PathAlgorithm = {
    ASTAR: {
        name: 'A* Search',
        symbol: 'A*',
        fyi: 'A* is guaranteed to return a least-cost path from start to goal.',
    },
    Dijkstra: {
        name: 'Dijkstra',
        symbol: 'Dijkstra\'s',
        fyi: 'Dijkstra calculates shortest-path from source to every node in the graph, so it would require additional time.',
    },
    DijkstraQueue: {
        name: 'Dijkstra Min Heap',
        symbol: 'Dijkstra\'s Min Heap',
        fyi: 'Dijkstra calculates shortest-path from source to every node in the graph, so it would require additional time.',
    },
    BFS: {
        name: 'Breadth First Search',
        symbol: 'BFS',
        fyi: '',
    },
    DFS: {
        name: 'Depth First Search',
        symbol: 'DFS',
        fyi: '',
    },
    GBFS: {
        name: 'Greedy Best First Search',
        symbol: 'Greedy BFS',
        fyi: '',
    }
};

export const PathAlgorithms = [
    PathAlgorithm.ASTAR,
    PathAlgorithm.Dijkstra,
    PathAlgorithm.DijkstraQueue,
    PathAlgorithm.BFS,
    PathAlgorithm.DFS,
    PathAlgorithm.GBFS,
];

export const Illu = {
    startNode: {
        illuLabel: 'S',
        illuCN: 'illu-unvisited',
        label: 'Start Node'
    },
    endNode: {
        illuLabel: 'E',
        illuCN: 'illu-unvisited',
        label: 'End Node'
    },
    unvisted: {
        illuCN: 'illu-unvisited',
        label: 'Unvisited Node'
    },
    visited: {
        illuCN: 'illu-visited',
        label: 'Visited Node'
    },
    path: {
        illuCN: 'illu-path',
        label: 'Path Node'
    },
    wall: {
        illuCN: 'illu-wall',
        label: 'Wall Node'
    },
};

export const Illustrations = [
    Illu.startNode,
    Illu.endNode,
    Illu.unvisted,
    Illu.visited,
    Illu.path,
    Illu.wall,
];

export const MazeAlgorithm = {
    IterativeBacktracking: {
        name: 'Iterative Backtracking',
        symbol: 'Iterative Backtracking',
        fyi: '',
    },
    VerticalRecursiveDivision: {
        name: 'Vertical Recursive Division',
        symbol: 'Vertical Recursive Division',
        fyi: '',
    },
    HorizontalRecursiveDivision: {
        name: 'Horizontal Recursive Division',
        symbol: 'Horizontal Recursive Division',
        fyi: '',
    },
};

export const MazeAlgorithms = [
    MazeAlgorithm.IterativeBacktracking,
    MazeAlgorithm.VerticalRecursiveDivision,
    MazeAlgorithm.HorizontalRecursiveDivision,
];