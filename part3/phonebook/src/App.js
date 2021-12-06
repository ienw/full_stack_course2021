import React, { useState } from 'react'
import personsService from './services/persons'
import './App.css'



const Filter = (props) => {
  return (
    <div>
      filter shown with 
      <input value={props.search} onChange={props.handleSearchChange}/>
    </div>
  )
}

const Personform = (props) => {
  return (
    <form onSubmit={props.addSomething}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>number: <input value={props.newPhone} onChange={props.handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = (props) => {
  return(
    <div>
      {props.personsToShow.map(person => 
        <Person key={person.name} person={person} removePerson={props.removePerson}/>)}
    </div>
  )
}

const Person = (props) => {
  return (
    <>
      <li>{props.person.name}{' '}{props.person.number}{' '}
      <button onClick={() => props.removePerson(props.person)}>delete</button></li>
      
    </>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ error }) => {
  if (error === null) {
    return null
  }

  return (
    <div className="error">
      {error}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [search, setSearch] = useState('')

  const [notification, setNotification] = useState(null)

  const [error, setError] = useState(null)

  React.useEffect(() => {
    const promise = personsService.getAll()
    promise.then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, []);


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const removePerson = (person) => {
    const msg = window.confirm(`Delete ${person.name}`)
    if(msg===true){
      return personsService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id != person.id)))
        .catch((e) => {
          setError(e.response.data.error)
          setTimeout(() => setError(null), 5000)
        })
    }
    
  }


  const addSomething = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const foundPerson = persons.find(person => person.name === newName);
    if (foundPerson) {
      const msg2 = window.confirm(`${foundPerson.name} is already added to the phonebook, replace it with a new phone number?`)
      if(msg2===true){
        return personsService
          .update(foundPerson.id, {...foundPerson, number: newPhone})
          .then((response) => {
            setPersons(persons.map(person => {
              if (person.id == foundPerson.id) {
                return response.data
              } else {
                return person
              }
            }))
            setNotification(`${foundPerson.name} has been updated`)
            setTimeout(() => setNotification(null), 5000)
          })
          .catch((e) => {
            setError(e.response.data.error)
            setTimeout(() => setError(null), 5000)
          })
      }
    } else {
      const person = {name: newName, number: newPhone}
      
      const promise = personsService.create(person)
      promise.then(response => {
        console.log(response)
        setPersons([...persons, response.data])
        setNotification(`Added ${person.name}`)
        setTimeout(() => setNotification(null), 5000)
      })
      .catch((e) => {
        console.log(e)
        setError(e.response.data.error)
        setTimeout(() => setError(null), 5000)
      })
    }
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value) 
    setNewName(event.target.value)
  }

  const handleSearchChange =(event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Notification message={notification} />
      <Error error={error}/>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <Personform 
        addSomething={addSomething}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}   
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/> 
    </div>
  )
}

export default App