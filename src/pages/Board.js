import React, { useState } from 'react';
import Cell from '../components/Cell';
import Node from '../objects/Node';

function Board(props) {
    const [currentMovingNode, setCurrentMovingNode] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);

    if (!props.grid) {
        return null;
    }

    function onMouseDown() {
        setMouseDown(true);
    }

    function onMouseUp() {
        setCurrentMovingNode(null);
        setMouseDown(false);
    }

    function onDownCell(node = new Node()) {
        if (node.start) {
            setCurrentMovingNode('start');
        }
        if (node.end) {
            setCurrentMovingNode('end');
        }
    }

    return (
        <>
            <table
                id='grid'
                className='grid'
                cellPadding='0'
                cellSpacing='0'
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                <tbody>
                    {props.grid.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((col, colIndex) => {
                                    return (
                                        <td key={colIndex}>
                                            <Cell
                                                grid={props.grid}
                                                node={col}
                                                row={row}
                                                onDownCell={onDownCell}
                                                currentMovingNode={currentMovingNode}
                                                mouseDown={mouseDown}
                                                setNode={props.setNode}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Board;