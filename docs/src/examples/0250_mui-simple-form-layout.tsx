import React from 'react'
import {
  TextInput,
  SelectInput,
  RadioInput,
  CheckboxInput,
  GroupLayout,
  SimpleFormLayout,
  SwitchInput,
  SliderInput,
} from '@zecos/input-mui'
import { validateName } from '@zecos/validate'

const Example = () => {
  const { MyForm, MyFormDisplay } = SimpleFormLayout({
    name: "myForm",
    items: [
      TextInput({
        validate: validateName,
        init: '',
        name: "firstName"
      }),
      TextInput({
        validate: validateName,
        init: '',
        name: "lastName"
      }),
      SelectInput({
        init: "blue",
        name: "favoriteColor",
        label: "What is your favorite color?",
        props: {
          options: {
            Blue: "blue",
            Red: "red",
            Pink: "pink",
            Purple: "purple",
          }
        }
      }),
      RadioInput({
        init: "rockyroad",
        name: "favoriteFlavor",
        label: "Favorite Flavor of Ice Cream",
        props: {
          options: {
            "Rocky Road": "rockyroad",
            Chocolate: "chocolate",
            Vanilla: "vanilla",
          }
        },
      }),
      CheckboxInput({
        init: true,
        name: "cool",
        label: "I am cool",
      }),
      SwitchInput({
        init: false,
        name: "light",
      }),
      SliderInput({
        init: 30,
        name: 'temperatureVertical',
        props: {
          min: 0,
          max: 100,
          step: 10,
          marks: [...new Array(11)]
            .map((_, num) => ({
              label: `${num * 10}°C`,
              value: num * 10
            })),
        }
      }),
      GroupLayout({
        name: "bandsILike",
        items: [
          CheckboxInput({
            init: false,
            name: "systemOfADown",
          }),
          CheckboxInput({
            init: false,
            name: "blink182",
          }),
          CheckboxInput({
            init: false,
            name: "sum41"
          }),
        ],
        validate: (items) => {
          const totalLiked = items.reduce((acc, item) => (
            acc + Number(item.state.value)
          ), 0)
          if (totalLiked > 2) {
            return [new Error("Pick no more than 2.")]
          }
          return []
        }
      })
    ],
  })
  
  const handleSubmit = e => {
    e.preventDefault()
    window.alert("Submitted sucessfully!")
  }
  
  return (
    <div>
      <MyForm onSubmit={handleSubmit} />
      <br />
      <MyFormDisplay />
    </div>
  )
}

export default Example