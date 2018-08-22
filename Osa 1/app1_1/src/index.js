import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return(
        <div>
            <h1>{props.course.nimi}</h1>
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
            <Osa part={props.course.osat[0].nimi} task={props.course.osat[0].tehtavia}/>
            <Osa part={props.course.osat[1].nimi} task={props.course.osat[1].tehtavia}/>
            <Osa part={props.course.osat[2].nimi} task={props.course.osat[2].tehtavia}/>
        </div>
    );
};

const Yhteensa = (props) => {
    return (
        <div>
            <p>Yhteensä {props.course.osat[0].tehtavia
        +props.course.osat[1].tehtavia+props.course.osat[2].tehtavia} tehtävää</p>
        </div>
    )
};

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
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
        ]
    }

    return (
        <div>
            <Otsikko course={kurssi}/>
            <Sisalto course={kurssi}/>
            <Yhteensa course={kurssi}/>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);