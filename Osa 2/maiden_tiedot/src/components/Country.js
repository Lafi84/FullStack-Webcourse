import React from 'react';

const Country = ({country}) => {
    const getLanguages = () => {
      return country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)
    };

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Languages</h2>
            <ul>
                {getLanguages()}
            </ul>
            <img src={country.flag} width={200}></img>
        </div>
    );
};

export default Country;