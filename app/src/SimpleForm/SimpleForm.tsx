import React from "react"
import { validateName, createOneOfValidator } from "@zecos/validate"
import { TextInput, SelectInput, RadioInput, CheckboxInput, GroupLayout, SwitchInput,  SliderInput, SimpleFormLayout, Multi } from "@zecos/input-mui"
import { TimePickerInput, DatePickerInput } from '@zecos/input-picker'
        
export const SimpleForm = () => {
  const {SimpleForm, SimpleFormDisplay, logSimpleForm}  = SimpleFormLayout({
    name: 'simpleForm',
    items: [
      TextInput({
        validate: validateName,
        name: "firstName"
      }),
      TextInput({
        validate: validateName,
        name: "lastName"
      }),
      Multi({
        init: [
          TextInput({
            validate: validateName,
            name: "firstName"
          }),
          TextInput({
            validate: validateName,
            name: "lastName"
          }),
        ],
        name: "people"
      })
    ],
    props: {
      className: "form"
    }
  })

  return (
    <>
    <SimpleForm />
    <SimpleFormDisplay className="form" full={true} />
    <br />
    <div className="form">
    <button onClick={() => logSimpleForm({full: false})}>Log</button>
    </div>
    </>
  )
}
 