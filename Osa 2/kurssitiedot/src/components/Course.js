import React from 'react';

const Header = ({name}) => {
  return (
      <h1>{name}</h1>
  );
};

const Content = ({parts}) => {
    const getParts = () => {
        return parts.map(part => <Part part={part}></Part>);
    };

    return (
        <div>
        {getParts()}
        </div>
    );
};

const Part = ({part}) => {
  return (
      <div key={part.id}>{part.name} {part.exercises}</div>
  );
};

const Total = ({parts}) => {
    const getTotal = () => {
        const reducer = (accumulator, currentValue) => {
            return {exercises: accumulator.exercises + currentValue.exercises};
        };

        return parts.reduce(reducer).exercises;
    };
    return (
        <div><b>Total of exercises {getTotal()}</b></div>
    );
};

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}></Header>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    );
};

export default Course;