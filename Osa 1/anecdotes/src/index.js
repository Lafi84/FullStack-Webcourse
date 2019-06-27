import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [points, setPoints] = useState({});
    const [selected, setSelected] = useState(0);

    const randomizeAnecdote = () => {
       return setSelected(Math.floor(Math.random() * props.anecdotes.length));
    };

    const getMostVotedAnecdote = () => {
        if(!points)
            return 0;

        let highest = 0;
        let highestIndex = 0;
        for(let i in points) {
            if(points.hasOwnProperty(i)) {
                if(points[i]>highest) {
                    highest = points[i];
                    highestIndex = i;
                }
            }
        }
        return highestIndex;
    };

    const addPoint = () => {
        return () => {
            const pointsCopy = {...points};
            pointsCopy[selected] = pointsCopy[selected] ? pointsCopy[selected]+1 : 1;
            setPoints(pointsCopy);
        }
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{props.anecdotes[selected]}</div>
            <div>{points[selected] ? points[selected] : 0}</div>
            <button onClick={addPoint()}>Vote</button>
            <button onClick={randomizeAnecdote}>Randomize</button>
            <h1>Most voted anecdote</h1>
            {props.anecdotes[getMostVotedAnecdote()]}
        </div>
    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)