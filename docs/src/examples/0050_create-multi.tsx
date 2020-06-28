import React from 'react'
import { createMulti } from '@zecos/input'
import { Text, GroupLayout } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'

const Multi:any = createMulti(({items, actions, helpers}) => {
  return <>
    {items.map((Input, i) => (
      <div key={i}>
      <Input.Cmpt />
      <button
        style={{display: "block"}}
        onClick={() => actions.splice(i, 1)}
      >
        Remove Person
      </button>
      </div>
    ))}
  </>
})

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
      <button
        type="button"
        onClick={() => actions.push(newPerson)}
      >
        Add Person
      </button>
    </div>
}


export default MultiForm
