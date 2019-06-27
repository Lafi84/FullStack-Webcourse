import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return(
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
};

const Part = (props) => {
    return(
        <div>
            <p>{props.part} {props.task}</p>
        </div>
    )
};

const Content = (props) => {
    return (
        <div>
            <Part part={props.course.parts[0].name} task={props.course.parts[0].tasks}/>
            <Part part={props.course.parts[1].name} task={props.course.parts[1].tasks}/>
            <Part part={props.course.parts[2].name} task={props.course.parts[2].tasks}/>
        </div>
    );
};

const Sum = (props) => {
    return (
        <div>
            <p>Yhteensä {props.course.parts[0].tasks
        +props.course.parts[1].tasks+props.course.parts[2].tasks} tehtävää</p>
        </div>
    )
};

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                tasks: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                tasks: 7
            },
            {
                name: 'Komponenttien tila',
                tasks: 14
            }
        ]
    };

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Sum course={course}/>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);