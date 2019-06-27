import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter.js'
import Countries from './components/Countries.js'

function App() {
    const [ filter, setFilter ] = useState('');
    const [ countries, setCountries ] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            });
    }, []);

    const filterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
    <div>
        <h1>Countries</h1>
        <Filter filter={filter} onChange={filterChange}/>
        <Countries filter={filter} countries={countries} setFilter={setFilter}/>
    </div>
  );
}

export default App;
