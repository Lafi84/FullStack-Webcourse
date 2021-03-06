import React from 'react'

const PersonForm = ({submitContact, newName, nameChange, newNumber, numberChange}) => {
    return (
        <div>
            <h2>Add new</h2>
            <form onSubmit={submitContact}>
                <div>
                    name: <input value={newName} onChange={nameChange}/>
                </div>
                <div>
                    number: <input type={'tel'} value={newNumber} onChange={numberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;