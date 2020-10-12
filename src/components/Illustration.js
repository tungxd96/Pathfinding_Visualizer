import React from 'react';
import { Illustrations } from '../config/Enum';

function Illustration() {
    return (
        <div className='illu-container illu-flex'>
            {Illustrations.map((value, index) => {
                return (
                    <div key={index} className='illu-flex'>
                        <div className={`illu-cell ${value.illuCN} illu-node`}>{value.illuLabel ? value.illuLabel : ''}</div>
                        <div className='illu-label'>{value.label}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Illustration;