import React, { useState } from 'react'

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
        {course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
      <strong>Total of <Sum a={course}></Sum> exercises</strong>
    </>
  )
  
} 

const Sum = ({a}) => {
  return a.parts.reduce(
    function(sum, part) {
      return sum + part.exercises
    },
    0
  )
}

export default Course