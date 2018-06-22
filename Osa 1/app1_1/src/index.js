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
            <Osa part={props.content[0].part} task={props.content[0].task}/>
            <Osa part={props.content[1].part} task={props.content[1].task}/>
            <Osa part={props.content[2].part} task={props.content[2].task}/>
        </div>
    );
};

const Yhteensa = (props) => {
    return (
        <div>
            <p>Yhteensä {props.total} tehtävää</p>
        </div>
    )
};

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys';
    const osa1 = 'Reactin perusteet';
    const tehtavia1 = 10;
    const osa2 = 'Tiedonvälitys propseilla';
    const tehtavia2 = 7;
    const osa3 = 'Komponenttien tila';
    const tehtavia3 = 14;

    return (
        <div>
            <Otsikko name={kurssi}/>
            <Sisalto content={[{part: osa1, task: tehtavia1}, {part: osa2, task: tehtavia2},
            {part: osa3, task: tehtavia3}]}/>
            <Yhteensa total={tehtavia1 + tehtavia2 + tehtavia3}/>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);