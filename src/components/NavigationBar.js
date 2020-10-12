import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import AlgorithmDropdown from './AlgorithmDropdown';

import {
    PathAlgorithm,
    MazeAlgorithm,
    PathAlgorithms,
    MazeAlgorithms,
} from '../config/Enum';

import { cleanVisualization, clearAll, id, clearMaze } from '../algorithms/Helper/AlgorithmHelper';

import FYI from './FYI';
import Illustration from './Illustration';

import { visualizeAStar } from '../algorithms/Path/AStar';
import { visualizeBFS } from '../algorithms/Path/BFS';
import { visualizeDijkstraMinHeap, visualizeDijkstra } from '../algorithms/Path/Dijkstra';
import { visualizeDFS } from '../algorithms/Path/DFS';
import { visualizeGBFS } from '../algorithms/Path/GBFS';
import { generateIterativeBackTracking } from '../algorithms/Maze/IterativeBacktracking';
import { generateRecursiveDivision } from '../algorithms/Maze/RecursiveDivision';

function NavigationBar(props) {
    const [pathAlgorithm, setPathAlgorithm] = useState(PathAlgorithm.ASTAR);
    const [mazeAlgorithm, setMazeAlgorithm] = useState(MazeAlgorithm.IterativeBacktracking);
    const [prevPath, setPrevPath] = useState(null);
    const [prevMaze, setPrevMaze] = useState(null);
    const [isPathVisualizing, setIsPathVisualizing] = useState(false);
    const [isMazeGenerating, setIsMazeGenerating] = useState(false);

    function pickPathAlgorithm(algorithm) {
        if (isPathVisualizing || isMazeGenerating) return;

        setPathAlgorithm(algorithm);
        setMazeAlgorithm(null);
    }

    function pickMazeAlgorithm(algorithm) {
        if (isPathVisualizing || isMazeGenerating) return;

        setMazeAlgorithm(algorithm);
        setPathAlgorithm(null);
    }

    function visualizeShortestPathByAlgorithm(algorithm) {
        switch (algorithm) {
            case PathAlgorithm.ASTAR:
                return visualizeAStar(props);
            case PathAlgorithm.Dijkstra:
                return visualizeDijkstra(props);
            case PathAlgorithm.DijkstraQueue:
                return visualizeDijkstraMinHeap(props);
            case PathAlgorithm.BFS:
                return visualizeBFS(props);
            case PathAlgorithm.DFS:
                return visualizeDFS(props);
            case PathAlgorithm.GBFS:
                return visualizeGBFS(props);
            default:
                return null;
        }
    }

    function generateMazeByAlgorithm(algorithm) {
        switch (algorithm) {
            case MazeAlgorithm.IterativeBacktracking:
                return generateIterativeBackTracking(props);
            case MazeAlgorithm.VerticalRecursiveDivision:
                return generateRecursiveDivision(props, 'V');
            case MazeAlgorithm.HorizontalRecursiveDivision:
                return generateRecursiveDivision(props, 'H');
            default:
                return null;
        }
    }

    function visualizeShortestPath() {
        cleanVisualization(prevPath);

        const visualization = visualizeShortestPathByAlgorithm(pathAlgorithm);

        setPrevPath(visualization);

        if (visualization) {
            if (visualization.visited) {
                setIsPathVisualizing(true);
                document.getElementById('grid').style.pointerEvents = 'none';

                for (let i = 0; i < visualization.visited.length; i++) {
                    setTimeout(() => {
                        const node = visualization.visited[i];
                        node.visited = true;
                        document.getElementById(id(node)).className = 'cell disable-selection node visited node-label';
                    }, 2.5 * i);

                    if (i === visualization.visited.length - 1) {
                        setTimeout(() => {
                            for (const i in visualization.path) {
                                setTimeout(() => {
                                    const node = visualization.path[i];
                                    node.path = true;
                                    document.getElementById(id(node)).className = `cell disable-selection node path node-label`;
                                    if (parseInt(i) === visualization.path.length - 1) {
                                        setIsPathVisualizing(false);
                                        document.getElementById('grid').style.pointerEvents = 'auto';
                                    }
                                }, 12.5 * i);
                            }
                            if (visualization.path.length === 0) {
                                setIsPathVisualizing(false);
                                document.getElementById('grid').style.pointerEvents = 'auto';
                            }
                        }, 2.5 * i);
                    }
                }
            }
        }
    }

    function generateMaze() {
        clearAll(props.grid);

        if (prevMaze) {
            setPrevMaze(null);
        }

        const maze = generateMazeByAlgorithm(mazeAlgorithm);
        setPrevMaze(maze);

        if (maze) {
            if (maze.walls) {
                setIsMazeGenerating(true);
                document.getElementById('grid').style.pointerEvents = 'none';

                for (let i = 0; i < props.grid.length; i++) {
                    for (let j = 0; j < props.grid[0].length; j++) {
                        if (i === 0 || j === 0 || i === props.grid.length - 1 || j === props.grid[0].length - 1) {
                            setTimeout(() => {
                                props.grid[i][j].wall = true;
                                document.getElementById(id(props.grid[i][j])).className = 'cell disable-selection wall';
                            }, 7.5 * i);
                        }
                        continue;
                    }
                }

                for (let i = 0; i < maze.walls.length; i++) {
                    setTimeout(() => {
                        const node = maze.walls[i];
                        node.wall = true;
                        document.getElementById(id(node)).className = 'cell disable-selection wall';
                        if (i === maze.walls.length - 1) {
                            setIsMazeGenerating(false);
                            document.getElementById('grid').style.pointerEvents = 'auto';
                        }
                    }, 7.5 * i);
                }

                if (maze.walls.length === 0) {
                    setIsMazeGenerating(false);
                    document.getElementById('grid').style.pointerEvents = 'auto';
                }
            }
        }
    }

    function clearGrid() {
        clearAll(props.grid);
        cleanVisualization(prevPath);
        clearMaze(prevMaze);
    }

    function actionButtonText() {
        if (pathAlgorithm) {
            if (isPathVisualizing) {
                return 'Visualizing Shortest Path';
            }
            else {
                return `Visualize ${pathAlgorithm.symbol}`;
            }
        }
        if (mazeAlgorithm) {
            if (isMazeGenerating) {
                return 'Generating Maze';
            }
            else {
                return `Generate Maze ${mazeAlgorithm.symbol}`;
            }
        }
        return 'Visualize';
    }

    function actionButtonOnClick() {
        if (pathAlgorithm) {
            if (!isPathVisualizing) {
                return visualizeShortestPath();
            }
            else {
                return null;
            }
        }

        if (mazeAlgorithm) {
            if (!isMazeGenerating) {
                return generateMaze();
            }
            else {
                return null;
            }
        }

        return null;
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href='#home'>Pathfinding Visualizer</Navbar.Brand>
                <Nav className="mr-auto">
                    <AlgorithmDropdown
                        title='Path Algorithms'
                        algorithms={PathAlgorithms}
                        pickAlgorithm={pickPathAlgorithm}
                    />
                    <AlgorithmDropdown
                        title='Maze Algorithms'
                        algorithms={MazeAlgorithms}
                        pickAlgorithm={pickMazeAlgorithm}
                    />
                    <Button
                        className='mr-sm-3 ml-sm-3'
                        variant={!isPathVisualizing && !isMazeGenerating ? 'success' : 'warning'}
                        onClick={actionButtonOnClick}
                    >{actionButtonText()}</Button>
                    <Nav.Link onClick={!isPathVisualizing && !isMazeGenerating ? clearGrid : null}>Clear</Nav.Link>
                </Nav>
            </Navbar>
            <Illustration />
            <FYI algorithm={pathAlgorithm} />
        </>
    );
}

export default NavigationBar;