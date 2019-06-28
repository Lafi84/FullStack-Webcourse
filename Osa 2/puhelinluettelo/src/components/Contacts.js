import React from 'react'

const Contacts = ({persons, filter, deleteTrigger}) => {
    console.log(persons);
    const getContacts = () => {
        return persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase())>=0).map(person =>
            <div key={person.name}>{person.name} {person.number} <button onClick={deleteTrigger(person)}>delete</button></div>);
    };
    return (
        <div>
            {getContacts()}
        </div>
    );
};

export default Contacts;