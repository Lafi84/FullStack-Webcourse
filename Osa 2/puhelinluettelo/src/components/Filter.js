import React from 'react'

const Filter = ({filter, onChange}) => {
    console.log(filter, onChange);
    return (
        <div>
            <h2>Filter shown with</h2>
            <div>
                name: <input value={filter} onChange={onChange}/>
            </div>
        </div>
    );
};

export default Filter;