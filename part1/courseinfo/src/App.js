import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
      <p>{props.parts1} {props.parts2}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts1={props.parts[0].name} parts2={props.parts[0].exercises}></Part>
      <Part parts1={props.parts[1].name} parts2={props.parts[1].exercises}></Part>
      <Part parts1={props.parts[2].name} parts2={props.parts[2].exercises}></Part>
    </div>
    
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div> 
      <Header course={course} />
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>  
  )
}

export default App