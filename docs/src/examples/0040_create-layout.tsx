import React from 'react'
import { createLayout } from "@zecos/input"
import { Text, Select, TextArea } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'

const SimpleFormLayout = createLayout(({props, items, errors, helpers}) => {
  return (
    <form {...props}>
      <div>{helpers.title}</div>
      {errors[0] && errors[0].toString()}
      {items.map((Input, i) => (
        <span key={i}><Input.Cmpt key={i} /></span>
      ))}
    </form>
  )
})

const Example = () => {
  const { Form, FormDisplay } = SimpleFormLayout({
    name: 'form',
    items: [
      Text({
        validate: validateName,
        name: "firstName",
        init: "Zane",
      }),
      TextArea({
        name: "describeYourself"
      }),
      Select({
        init: "blue",
        name: "favoriteColor",
        props: {
          options: {
            "Blue": "blue",
            "Red": "red",
          }
        }
      })
    ],
    validate: (items:any) => {
      if (items[0].state.value === "Zane") {
        return [new Error("Name cannot be Zane")]
      }
      return []
    }
  })
  
  return (
    <div>
      <Form />
      <FormDisplay />
    </div>
  )
}

export default Example