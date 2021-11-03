import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '0123456' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [newPhone, setNewPhone] = useState('')


  const addSomething = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const isSameName = persons.some(person => person.name === newName);
    if (isSameName) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, {name: newName, phone: newPhone}])
    }
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value) 
    setNewName(event.target.value)
  }

console.log(persons)
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addSomething}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <li key={person.name}>{person.name}{' '}{person.phone}</li>)}
    </div>
  )
}

export default App