import React from "react"
import { validateName } from "@zecos/validate"
import { TextInput} from "@zecos/input-mui"

const TextInputExample = () => {
  const {FirstName, FirstNameDisplay} = TextInput({
    validate: validateName,
    init: '',
    name: "firstName"
  })

  return (
    <>
    <form className="form">
      <FirstName />
      <FirstNameDisplay />
    </form>
    <br />
    {/* display the data */}
    </>
  )
}
 
export default TextInputExample