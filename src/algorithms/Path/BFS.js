import { 
    key, 
    findNeighbors, 
    round, 
    reconstructFinalPathFromParent 
} from "../Helper/AlgorithmHelper";
import Queue from "../../objects/Queue";

export const visualizeBFS = props => {
    var t0 = performance.now();

    const graph = props.grid, startNode = props.startNode, endNode = props.endNode;
    if (!startNode || !endNode) {
        return null;
    }

    const Q = new Queue(), discovered = new Map(), V = [];
    discovered[key(startNode)] = true;
    Q.enqueue(startNode);

    while (!Q.isEmpty()) {
        const v = Q.dequeue();
        V.push(v);

        if (v === endNode) {
            var t1 = performance.now();
            const path = reconstructFinalPathFromParent(startNode, v);

            return {
                visited: V,
                path: path,
                steps: path.length,
                time: round(t1 - t0)
            };
        }

        const edges = findNeighbors(graph, v);
        for (const w of edges) {
            if (!w.wall) {
                if (!discovered[key(w)]) {
                    discovered[key(w)] = true;
                    w.parent = v;
                    Q.enqueue(w);
                }
            }
        }
    }

    var t2 = performance.now();

    return {
        visited: V,
        path: [],
        steps: 0,
        time: round(t2 - t0)
    };
}