import React from "react"
import { validateUsername, validateName, validateEmail } from "@zecos/validate"
import { TextArea, Select, Text } from "@zecos/input-basic"
import './InputForm.css'
 
const fieldProperties = {
  firstNameOfTheApplicantForThisForm: {
    init: "",
    validate: validateName,
  },
  lastName: {
    init: "",
    validate: validateName,
  },
  email: {
    init: "",
    validate: validateEmail,
  },
  username: {
    init: "",
    validateUsername,
  },
  describeYourself: {
    init: "",
  },
  favoriteColor: {
    init: "red",
  },
  customField: {
    validate: (val: string) => {
      if (val !== "hello") {
        return [new Error("value must be hello!")]
      }
      return []
    },
    init: "this is my init value"
  }
}
const colors = {
  Red: "red",
  Green: "green",
  Blue: "blue",
  Purple: "purple",
  ["Alice Blue"]: "aliceblue"
}


export const InputForm = () => {
  const {firstName, FirstName, firstNameState, FirstNameDisplay} = Text({
    validate: validateName,
    name: "firstName"
  })

  const {DescribeYourself, describeYourselfState} = TextArea({
    name: "describeYourself"
  })
  
  const {FavoriteColor, favoriteColorState} = Select({
    init: "blue",
    name: "favoriteColor",
  })
  return (
    <form className="form">
      {/* These are your inputs */}
      <FirstName />
      <DescribeYourself />
      <FavoriteColor options={colors}/>

      {/* display the data */}
      First Name State: {firstNameState.value}<br />
      Describe Yourself: {describeYourselfState.value}<br />
      Favorite Color: {favoriteColorState.value}
      <FirstNameDisplay />
    </form>
  )
}

 