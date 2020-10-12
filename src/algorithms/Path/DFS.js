import { 
    key, 
    findNeighbors, 
    round 
} from "../Helper/AlgorithmHelper";

export const visualizeDFS = props => {
    var t0 = performance.now();

    const graph = props.grid, startNode = props.startNode, endNode = props.endNode;
    if (!startNode || !endNode) {
        return null;
    }

    const S = [startNode], discovered = new Map(), visited = [];

    while (S.length > 0) {
        const v = S.pop();
        visited.push(v);

        if (v === endNode) {
            var t1 = performance.now();

            return {
                visited: visited,
                path: visited,
                steps: visited.length,
                time: round(t1 - t0)
            };
        }

        if (!discovered[key(v)]) {
            discovered[key(v)] = true;

            const neighbors = findNeighbors(graph, v);

            for (const w of neighbors) {
                if (!w.wall) {
                    S.push(w);
                }
            }
        }
    }

    var t2 = performance.now();

    return {
        visited: visited,
        path: [],
        steps: 0,
        time: round(t2 - t0)
    };
}