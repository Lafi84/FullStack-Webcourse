import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Contacts from './components/Contacts.js'

const App = () => {
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled');
                setPersons(response.data)
            });
    }, []);


    const submitContact = (event) => {
      event.preventDefault();
      console.log('Adding name', newName);
      if(newNumber.length===0){
        window.alert('Phone number length must exceed zero');
        return;
      }

      const personExists = persons.filter(person => person.name === newName);
      if(personExists.length>0)
          window.alert(`${newName} is already added to phonebook`);
      else {
          const newPerson = {name: newName, number: newNumber};
          setPersons(persons.concat(newPerson));
          clearForm();
      }
    };

    const clearForm = () => {
        setNewName('');
        setNewNumber('');
        setFilter('');
    };

    const nameChange = (event) => {
        setNewName(event.target.value);
    };

    const numberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const filterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter filter={filter} onChange={filterChange}/>
            <PersonForm submitContact={submitContact} newName={newName} newNumber={newNumber} nameChange={nameChange} numberChange={numberChange} />
            <Contacts persons={persons} filter={filter}/>
        </div>
    )

};

export default App