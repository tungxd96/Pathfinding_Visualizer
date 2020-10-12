import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function AlgorithmDropdown(props) {
    return (
        <NavDropdown title={props.title} id='basic-nav-dropdown'>
            {
                props.algorithms.map((item, index) => {
                    return (
                        <NavDropdown.Item key={index} onClick={() => props.pickAlgorithm(item)}>{item.name}</NavDropdown.Item>
                    )
                })
            }
        </NavDropdown>
    );
}

export default AlgorithmDropdown;