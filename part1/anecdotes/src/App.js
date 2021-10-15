import React, { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const random = (max) => {
    return Math.floor(Math.random()*max)
  } 

  const [selected, setSelected] = useState(random(anecdotes.length))
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  
  const anecdote = anecdotes[selected]
  let mostVoteAnec = null
  let mostVote = 0

  for(let i=0; i<anecdotes.length; i++){
    if(vote[i] > mostVote){
      mostVote = vote[i]
      mostVoteAnec = anecdotes[i]
    }
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdote}
    </div>
    <div>
      has {vote[selected]} votes
    </div>
    <button onClick={() => setSelected(random(anecdotes.length))}>new anecdotes</button>
    <button onClick={() => {
      const copy = [...vote]
      // increment the value in position 2 by one
      copy[selected] += 1
      setVote(copy)
    }}>vote</button>
    <h2>Anecdote with most votes</h2>
    <div> 
      {mostVoteAnec}
    </div>
    <div>
      has {mostVote} votes
    </div>
    </>
  )
}

export default App