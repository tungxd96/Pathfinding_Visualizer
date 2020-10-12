
import {
    calculateCost,
    findNeighbors,
    removeNodeFrom,
    nodeIncludes,
    round,
    reconstructFinalPathFromParent
} from "../Helper/AlgorithmHelper";
import Node from "../../objects/Node";

export const visualizeAStar = props => {
    var t0 = performance.now();

    const startNode = props.startNode;
    const endNode = props.endNode;
    const graph = props.grid;
    
    if (!startNode || !endNode) {
        return null;
    }

    startNode.setCost(evaluateCost(startNode, startNode, endNode));
    endNode.setCost(evaluateCost(endNode, startNode, endNode));

    let openSet = [startNode], closedSet = [], visited = [];

    while (openSet.length > 0) {
        let currentNode = openSet[0];

        for (const child of openSet) {
            if (child.cost.fCost < currentNode.cost.fCost || (child.cost.fCost === currentNode.cost.fCost && child.cost.hCost < currentNode.cost.hCost)) {
                currentNode = child;
            }
        }
        openSet = removeNodeFrom(openSet, currentNode);
        closedSet.push(currentNode);

        if (currentNode === endNode) {
            var t1 = performance.now();
            const path = reconstructFinalPathFromParent(startNode, currentNode);

            return {
                path: path,
                visited: visited,
                steps: path.length,
                time: round(t1 - t0)
            };
        }

        const neighbors = findNeighbors(graph, currentNode);
        let goodNeighbors = [];
        for (const neighborNode of neighbors) {
            neighborNode.setCost(evaluateCost(neighborNode, startNode, endNode));
            if (neighborNode.wall || nodeIncludes(closedSet, neighborNode)) {
                continue;
            }
            goodNeighbors.push(neighborNode);
            const tentativeGCost = currentNode.cost.gCost + calculateCost(currentNode, neighborNode);
            if (tentativeGCost < neighborNode.cost.gCost || !nodeIncludes(openSet, neighborNode)) {
                const cost = {
                    gCost: tentativeGCost,
                    hCost: neighborNode.cost.hCost,
                    fCost: tentativeGCost + neighborNode.cost.hCost
                }
                neighborNode.setCost(cost);
                neighborNode.parent = currentNode;
                if (!nodeIncludes(openSet, neighborNode)) {
                    visited.push(neighborNode);
                    openSet.push(neighborNode);
                }
            }
        }
    }

    var t2 = performance.now();

    return {
        path: [],
        visited: visited,
        steps: 0,
        time: round(t2 - t0)
    };
}

export const evaluateCost = (currentNode = new Node(), startNode = new Node(), endNode = new Node()) => {
    const gCost = calculateCost(currentNode, startNode);
    const hCost = calculateCost(currentNode, endNode);
    const fCost = gCost + hCost;
    return { gCost, hCost, fCost };
}