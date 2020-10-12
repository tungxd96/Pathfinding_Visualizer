import {
    calculateCost,
    findNeighbors,
    removeNodeFrom,
    round,
    key,
    reconstructFinalPathFromMap
} from "../Helper/AlgorithmHelper";
import MinHeap from "../../objects/MinHeap";

export const visualizeDijkstra = props => {
    var t0 = performance.now();

    const graph = props.grid, startNode = props.startNode, endNode = props.endNode;

    if (!startNode || !endNode) {
        return null;
    }
    let Q = [], V = [], dist = new Map(), prev = new Map();

    for (var i = 0; i < graph.length; i++) {
        for (var j = 0; j < graph[0].length; j++) {
            const v = graph[i][j];
            dist[key(v)] = Infinity;
            prev[key(v)] = undefined;
            Q.push(v);
        }
    }

    dist[key(startNode)] = 0;

    while (Q.length > 0) {
        let u = Q[0];
        for (let i in Q) {
            if (dist[key(u)] > dist[key(Q[i])]) {
                u = Q[i];
            }
        }
        Q = removeNodeFrom(Q, u);

        V.push(u);

        if (u === endNode) {
            var t1 = performance.now();
            const path = reconstructFinalPathFromMap(prev, startNode, endNode);

            return {
                path: path,
                visited: V,
                steps: path.length,
                time: round(t1 - t0),
            };
        }

        const neighbors = findNeighbors(graph, u);

        for (const v of neighbors) {
            const alt = dist[key(u)] + calculateCost(u, v);
            if (!v.wall) {
                if (alt < dist[key(v)]) {
                    dist[key(v)] = alt;
                    prev[key(v)] = u;
                }
            }
        }
    }

    var t2 = performance.now();

    return {
        path: reconstructFinalPathFromMap(prev, startNode, endNode),
        visited: V,
        steps: 0,
        time: round(t2 - t0)
    };
}

export const visualizeDijkstraMinHeap = props => {
    var t0 = performance.now();

    const graph = props.grid, startNode = props.startNode, endNode = props.endNode;
    
    if (!startNode || !endNode) {
        return null;
    }
    let V = [], dist = new Map(), prev = new Map();
    const Q = new MinHeap();

    dist[key(startNode)] = 0;

    for (var i = 0; i < graph.length; i++) {
        for (var j = 0; j < graph[0].length; j++) {
            const v = graph[i][j];
            if (v !== startNode) {
                dist[key(v)] = Infinity;
                prev[key(v)] = undefined;
            }
            Q.addWithPriority(v, dist[key(v)]);
        }
    }

    while (!Q.isEmpty()) {
        const u = Q.extractMin();
        if (!u) {
            var t2 = performance.now();

            return {
                path: [],
                visited: V,
                steps: 0,
                time: round(t2 - t0)
            };
        }
        V.push(u);

        if (u === endNode) {
            var t1 = performance.now();
            const path = reconstructFinalPathFromMap(prev, startNode, endNode);

            return {
                path: path,
                visited: V,
                steps: path.length,
                time: round(t1 - t0),
            };
        }

        const neighbors = findNeighbors(graph, u);

        for (const v of neighbors) {
            const alt = dist[key(u)] + calculateCost(u, v);
            if (!v.wall) {
                if (alt < dist[key(v)]) {
                    dist[key(v)] = alt;
                    prev[key(v)] = u;
                    Q.decreasePriority(v, alt);
                }
            }
        }
    }

    var t3 = performance.now();

    return {
        path: [],
        visited: V,
        steps: 0,
        time: round(t3 - t0)
    };
}