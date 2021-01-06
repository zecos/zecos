import React from "react"
import { validateUsername, validateName, validateEmail } from "@zecos/validate"
import { TextArea, Select, Text, SimpleForm, Button } from "@zecos/input-basic"
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
  const signup = () => {
      console.log("getting")
      console.log(Object.keys(simpleForm))
      // console.log((simpleFormGet as any)(["firstName", "lastName"]))
      // console.log("hasItemErrors", (simpleForm as any).hasItemErrors())
  }
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
  const {SimpleFormExample, SimpleFormDisplay, logSimpleForm, simpleFormGet, setValues, ...simpleForm}  = SimpleForm({
    name: 'simpleFormExample',
    items: [
      Text({
        validate: validateName,
        name: "firstName",
        props: {
          spellCheck: false,
        }
      }),
      Text({
        validate: validateName,
        name: "lastName"
      }),
    ],
    props: {
      className: "form"
    },
    loadingText: 'Loading...',
    submitButtonText: 'submit',
    action: ({values}) => {
      try {
        console.log(values())
      } catch (err) {
        console.log(err)
      }
    }
  })

  const setVals = () => {
    setValues({
      last_name: 'Hitchcox',
    })
  }

  return (
    <>
    {/* <FirstName /> */}
    {SimpleFormExample}
    <button onClick={setVals}>
      test set values
    </button>
    </>
  )
}


    // <form className="form">
    //   {/* These are your inputs */}
    //   <FirstName />
    //   <DescribeYourself />
    //   <FavoriteColor options={colors}/>

    //   {/* display the data */}
    //   First Name State: {firstNameState.value}<br />
    //   Describe Yourself: {describeYourselfState.value}<br />
    //   Favorite Color: {favoriteColorState.value}
    //   <FirstNameDisplay />
    //   <Button
    //   onClick={() => console.log('hello')}
    //     label="Click dawg"
    //   />
    // </form>