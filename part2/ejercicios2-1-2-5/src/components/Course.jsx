import React from 'react';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ total }) => {
  return (
    <p>
      <strong>Total of exercises: {total}</strong>
    </p>
  );
};

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default Course;

