import React, { useState } from 'react';
import './App.css';

const Button = ({text, value, addValue}) => {
  return (
      <button onClick={addValue}>{text}</button>
  )
};

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({good, neutral, bad}) => {
    const getTotal = () => good+neutral+bad;
    const getAverage = () => (good + (bad * -1)) / getTotal();
    const getPositive = () => (good / getTotal())*100 + '%';

    if(good || neutral || bad)
        return (
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic text={'Good'} value={good}></Statistic>
                        <Statistic text={'Neutral'} value={neutral}></Statistic>
                        <Statistic text={'Bad'} value={bad}></Statistic>
                        <Statistic text={'All'} value={getTotal()}></Statistic>
                        <Statistic text={'Average'} value={getAverage()}></Statistic>
                        <Statistic text={'Positive'} value={getPositive()}></Statistic>
                    </tbody>
                </table>
            </div>
        );
    else
        return (
            <div>
                <h1>Statistics</h1>
                <div>No feedback given</div>
            </div>
        )
};


const App = () => {
    const [good, addGood] = useState(0);
    const [neutral, addNeutral] = useState(0);
    const [bad, addBad] = useState(0);

    const addFeedback = (feedbacktype) => {
        console.log('Adding feedback button type: ' + feedbacktype);
        return () =>{
            console.log('Feedback button pressed: ' + feedbacktype);
            switch (feedbacktype) {
                case 'g': addGood(good+1);
                    break;
                case 'n': addNeutral(neutral+1);
                    break;
                case 'b': addBad(bad+1);
                    break;
                default: break;
            }
        };
    };

    return (
      <div className="App">
          <h1>Give feedback</h1>
          <Button text={'Good'} value={good} addValue={addFeedback('g')}></Button>
          <Button text={'Neutral'} value={good} addValue={addFeedback('n')}></Button>
          <Button text={'Bad'} value={good} addValue={addFeedback('b')}></Button>
          <Statistics good={good} bad={bad} neutral={neutral}/>
      </div>
    );
};

export default App;
