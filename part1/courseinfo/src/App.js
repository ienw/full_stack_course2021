import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
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
  const [ counter, setCounter ] = useState(0)
  
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 10)}>
        plus 10
      </button>
      <button onClick={() => setCounter(counter - 5)}>
        minus 5      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
      <button onClick={() => setCounter(10000000)}>
        one million
      </button>
      <button onClick={() => setCounter(counter*2)}>
        double
      </button>
      <button onClick={() => setCounter(Math.round(Math.sqrt(counter)))}>
        square root 
      </button>
    </div>
  )
}

export default App