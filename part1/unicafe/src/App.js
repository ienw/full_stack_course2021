import React, { useState } from 'react'

const Button = ({text, event}) => {
  return <button onClick={event}>{text}</button>
}
const StatisticLine = ({text, value}) => {
  return <div>{text + value}</div>
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const ave = (good - bad) / all
  const pos = good / all * 100

  if(good==0 && neutral==0 && bad==0) {
    return (
      <div>No feedback given</div>
    )   
  } 
  return (
    <>
      <StatisticLine text="good " value ={good} />
      <StatisticLine text="neutral " value ={neutral} />
      <StatisticLine text="bad " value ={bad} />
      <div>all {all}</div>
      <div>average {ave} </div>
      <div>positive {pos} %</div>
    </>
    ) 
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button event={() => setGood(good+1)} text="good" />
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App