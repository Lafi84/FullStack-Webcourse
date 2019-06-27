import React from 'react';

const Filter = ({filter, onChange}) => {
    console.log(filter, onChange);
    return (
        <div>
            <div>
                Find countries: <input value={filter} onChange={onChange}/>
            </div>
        </div>
    );
};

export default Filter;