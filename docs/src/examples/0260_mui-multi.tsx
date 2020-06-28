import React from 'react'
import { TextInput, GroupLayout, Multi } from '@zecos/input-mui'
import { Button } from "@material-ui/core"
import { validateName } from '@zecos/validate'

const newPerson = () => GroupLayout({
  name: 'friend',
  items: [
    TextInput({
      validate: validateName,
      name: "firstName"
    }),
    TextInput({
      validate: validateName,
      name: "lastName",
    }),
  ],
})

const MultiForm = () => {
  const {actions, Friends, FriendsDisplay} = Multi({
    init: [
      newPerson()
    ],
    name: "friends",
  })
  
  return <div>
      <Friends />
      <br />
      <Button
        type="button"
        variant="outlined"
        onClick={() => actions.push(newPerson)}
      >
        Add Person
      </Button>
      <br />
      <br />
      <FriendsDisplay />
    </div>
}

export default MultiForm