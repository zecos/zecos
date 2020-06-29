// export const MultiForm = () => {}
import React from 'react'
import { Multi, TextInput, SimpleFormLayout } from '@zecos/input-mui'
import { validateName } from '@zecos/validate'

const newSimple = () => SimpleFormLayout({
  name: 'form',
  items: [
    TextInput({
      validate: validateName,
      name: "firstName"
    }),
    TextInput({
      validate: validateName,
      name: "lastName"
    }),
  ]
})

export const MultiForm = () => {
  const newText = () => (
    TextInput({
      validate: validateName,
      name: "firstName"
    })
  )
  const {actions, inputs, FirstNames} = Multi({
    init: [
      newText()
    ],
    name: "firstNames",
  })
  const addFirst = (e:any) => {
    e.preventDefault()
    actions.push(newSimple)
  }
  
  return <form className="form">
      <FirstNames />
      <button onClick={addFirst}>Add First</button>
      <br />
      <br />
    </form>
}