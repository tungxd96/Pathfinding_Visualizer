import React from 'react';

function FYI(props) {
    if (!props.algorithm) {
        return null;
    }
    else {
        if (props.algorithm.fyi === '') {
            return null;
        }
    }
    
    return (
        <div className='fyi-container'>
            {props.algorithm.fyi}
        </div>
    );
}

export default FYI;