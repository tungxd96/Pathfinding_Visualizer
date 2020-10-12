import React, { useState } from 'react';

function Cell(props) {
    const [wall, setWall] = useState(props.node.wall);
    const [startNode, setStartNode] = useState(props.node.start);
    const [endNode, setEndNode] = useState(props.node.end);

    function extraClassNames() {
        if (props.node.start || props.node.end) {
            return 'node';
        }
        if (props.node.wall || wall) {
            return 'wall';
        }
        if (props.node.path) {
            return 'path'
        }
        if (props.node.visited) {
            return 'visited';
        }
        return '';
    }

    function onEnterCell() {
        if (props.currentMovingNode === 'start') {
            setStartNode(true);
            props.node.start = true;
        }

        if (props.currentMovingNode === 'end') {
            setEndNode(true);
            props.node.end = true;
        }

        if (!props.currentMovingNode && props.mouseDown) {
            props.node.wall = true;
            setWall(true);
        }
    }

    function onLeaveCell() {
        if (props.currentMovingNode === 'start') {
            setStartNode(false);
            props.node.start = false;
        }
        if (props.currentMovingNode === 'end') {
            setEndNode(false);
            props.node.end = false;
        }
    }

    function onDownCell() {
        props.onDownCell(props.node);

        if (!props.node.start && !props.node.end) {
            props.node.wall = !props.node.wall;
            setWall(props.node.wall);
        }
    }

    function onUpCell() {
        props.setNode(props.node);
    }

    return (
        <div
            id={`cell-${props.node.position.row}-${props.node.position.col}`}
            className={`cell disable-selection ${extraClassNames()}`}
            onMouseDown={onDownCell}
            onMouseEnter={onEnterCell}
            onMouseLeave={onLeaveCell}
            onMouseUp={onUpCell}
        >
            {startNode ? 'S' : null}
            {endNode ? 'E' : null}
        </div>
    );
}

export default Cell;