import React from "react"
import { validateName, createOneOfValidator } from "@zecos/validate"
import { TextInput, SelectInput, RadioInput, CheckboxInput, GroupLayout, SwitchInput,  SliderInput } from "@zecos/input-mui"
import { TimePickerInput, DatePickerInput } from "@zecos/input-picker"
import "./InputMDForm.css"
 
(window as any).realReact = React

const colors = {
  Blue: "blue",
  Red: "red",
}
const lessThan2 = (inputs: any) => {
  const count = inputs.reduce((acc:any, cur:any) => {
    const {state} = cur
    if (state.value) {
      return ++acc
    }
    return acc
  }, 0)
  if (count > 2) return [
    new Error("You cannot pick more than 2.")
  ]
  return []
}

export const renderGroupState = (inputs: any) => inputs
  .map((input:any) => {
    const {state, helpers} = input
    const key = helpers.title
    return <div key={key}>{key}: {"" + state.value}</div>
  })
        
export const InputMDForm = () => {
  const {FirstName, firstNameState} = TextInput({
    validate: validateName,
    name: "firstName"
  })

  const {LastName, lastNameState} = TextInput({
    validate: validateName,
    name: "lastName"
  })
  
  const {FavoriteColor, favoriteColorState} = SelectInput({
    init: "blue",
    name: "favoriteColor",
  })
  
  const {FavoriteFlavor, favoriteFlavorState} = RadioInput({
    init: "rockyroad",
    name: "favoriteFlavor",
    props: {
      label: "Favorite Flavor of Ice Cream",
    },
    validate: createOneOfValidator({options: ["chocolate", "vanilla"]}),
  })


  const {Cmpt:Cool, state:coolState} = CheckboxInput({
    init: false,
    name: "IAmCool",
  })
  
  const {MusicILike, musicILikeItems} = GroupLayout({
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
    name: "musicILike",
    validate: lessThan2,
  })

  const {MusicILikeSwitch, musicILikeSwitchItems} = GroupLayout({
    items: [
      SwitchInput({
        init: false,
        name: "systemOfADown",
      }),
      SwitchInput({
        init: false,
        name: "blink182",
      }),
      SwitchInput({
        init: false,
        name: "sum41"
      }),
    ],
    name: "musicILikeSwitch",
    validate: lessThan2,
  })
  const {AppointmentDate, appointmentDateState} = DatePickerInput({
    init: new Date,
    name: 'appointmentDate'
  })
  
  const {AppointmentTime, appointmentTimeState} = TimePickerInput({
    init: new Date,
    name: 'appointmentTime'
  })
  
  const {Temperature, temperatureState} = SliderInput({
    init: 30,
    name: 'temperature',
    props: {
      min: 0,
      max: 100,
      step: 10,
      orientation: "vertical",
      marks: [...new Array(11)]
        .map((_, num) => ({
          label: `${num * 10}°C`,
          value: num * 10
        })),
    }
  })

  return (
    <>
    <form className="form">
      <FirstName />
      <LastName />
      <FavoriteColor options={colors}/>
      <FavoriteFlavor
        options={{
          "Rocky Road": "rockyroad",
          Chocolate: "chocolate",
          Vanilla: "vanilla",
        }}
      /><br />
      <Cool /><br />
      <MusicILike row /><br />
      <MusicILikeSwitch /><br />
      <AppointmentDate /><br />
      <AppointmentTime /><br />
      <Temperature /><br />
      <div>
        First Name State: {firstNameState.value}<br />
        Last Name State: {firstNameState.value}<br />
        Favorite Color: {favoriteColorState.value}<br />
        Favorite Flavor: {favoriteFlavorState.value}<br />
        Cool: {String(coolState.value)}<br />
        Music I Like {renderGroupState(musicILikeItems)}
        Music I Like Radio {renderGroupState(musicILikeSwitchItems)}
        Appointment Time: {appointmentTimeState.value.toString()}<br />
        Appointment Date: {appointmentDateState.value.toString()}<br />
        Temperature: {temperatureState.value}<br />
      </div>
    </form>
    <br />
    {/* display the data */}
    </>
  )
}
 