import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return(
        <div>
            <h1>{props.name}</h1>
        </div>
    )
};

const Osa = (props) => {
    return(
        <div>
            <p>{props.part} {props.task}</p>
        </div>
    )
};

const Sisalto = (props) => {
    return (
        <div>
            <Osa part={props.osat[0].nimi} task={props.osat[0].tehtavia}/>
            <Osa part={props.osat[1].nimi} task={props.osat[1].tehtavia}/>
            <Osa part={props.osat[2].nimi} task={props.osat[2].tehtavia}/>
        </div>
    );
};

const Yhteensa = (props) => {
    return (
        <div>
            <p>Yhteensä {props.osat[0].tehtavia
        +props.osat[1].tehtavia+props.osat[2].tehtavia} tehtävää</p>
        </div>
    )
};

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys';
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ];

    return (
        <div>
            <Otsikko name={kurssi}/>
            <Sisalto osat={osat}/>
            <Yhteensa osat={osat}/>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);