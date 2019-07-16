import React from 'react'
import Country from './Country.js'

const Countries = ({countries, filter, setFilter}) => {
    console.log(countries);
    const setCountry = (country) => {
        return () => {
            setFilter(country.name);
        };
    };

    const getCountries = () => {
        const filteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase())>=0);
        if(filteredCountries.length>10)
            return <div>Too many matches, please specify another filter</div>;
        else if(filteredCountries.length===1)
            return <Country country={filteredCountries[0]}/>;
        else
            return filteredCountries.map(country => <div key={country.alpha2Code}>{country.name} <button onClick={setCountry(country)}>test</button></div>);
    };
    return (
        <div>
            {getCountries()}
        </div>
    );
};

export default Countries;