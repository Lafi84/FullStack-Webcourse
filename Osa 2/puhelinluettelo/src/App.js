import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Contacts from './components/Contacts.js'
import contactService from './services/ContactService.js';
import Notification from "./components/Notification";

const App = () => {
    const [ successMessage, setSuccessMessage ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        contactService.getAll()
            .then(response => {
                console.log('Contacts fetched');
                setPersons(response)
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

      if(personExists.length>0) {
          const personNumberChange = {...personExists[0], number: newNumber};
          replaceContact(personNumberChange);
          clearForm();
      }else {
          const newPerson = {name: newName, number: newNumber};
          contactService.create(newPerson).then(response => {
              setPersons(persons.concat(response));
              showSuccessMessage(`Created person ${newPerson.name}`);
              clearForm();
          });
        }
    };

    const deleteContact = (personToDelete) => {
        return () => {
          if(window.confirm(`Do you want to delete contact information from ${personToDelete.name} ?`)){
              contactService.del(personToDelete.id).then(response => {
                  setPersons(persons.filter(person => person.id !== personToDelete.id));
                  showSuccessMessage(`Deleted person ${personToDelete.name}`);
              });
          }
        };
    };

    const replaceContact = (personToReplace) => {
        if(window.confirm(`Do you want to replace contact for ${personToReplace.name} ?`)){
            contactService.update(personToReplace.id, personToReplace).then(response => {
                setPersons(persons.map(person => person.id === response.id ? response : person));
                showSuccessMessage(`Replaced phone number for ${response.name}`);
            }).catch(error => {
                setPersons(persons.filter(person => person.id !== personToReplace.id));
                showErrorMessage(`Person could not be modified, person ${personToReplace.name} has already been deleted`);
            });
        }
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);

        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    };

    const showErrorMessage = (message) => {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    };

    const clearForm = () => {
        setNewName('');
        setNewNumber('');
        setFilter('');
    };

    const getSuccessMessage = () => {
        console.log('message', successMessage);
        if(successMessage!==null)
          return <Notification message={successMessage} className={'success'}/>
    };

    const getErrorMessage = () => {
        console.log('errorMessage', errorMessage);
        if(errorMessage!==null)
            return <Notification message={errorMessage} className={'error'}/>
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
            {getSuccessMessage()}
            {getErrorMessage()}
            <Contacts persons={persons} filter={filter} deleteTrigger={deleteContact}/>
        </div>
    )

};

export default App