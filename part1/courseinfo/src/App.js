import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.cors}</h1>
  )
}

const Part = (props) => {
  return (
      <p>{props.part} {props.ex}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1.name} ex={props.part1.exercises}></Part>
      <Part part={props.part2.name} ex={props.part2.exercises}></Part>
      <Part part={props.part3.name} ex={props.part3.exercises}></Part>
    </div>
    
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header cors={course} />
      <Content part1={part1} part2={part2} part3={part3}></Content>
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises}></Total>
    </div>  
  )
}

export default App