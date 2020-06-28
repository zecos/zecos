import React from 'react'
import { Text, GroupLayout, Multi } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'

const newPerson = () => GroupLayout({
  name: 'person',
  items: [
    Text({
      validate: validateName,
      name: "firstName"
    }),
    Text({
      validate: validateName,
      name: "lastName",
    }),
  ],
})

const MultiForm = () => {
  const {actions, People, PeopleDisplay} = Multi({
    init: [
      newPerson()
    ],
    name: "people",
  })
  
  return <div>
      <People />
      <PeopleDisplay />
      <button type="button" onClick={() => actions.push(newPerson)}>Add Person</button>
    </div>
}


export default MultiForm
