import React from "react"
import { createInput } from '@zecos/input'
import { validateName } from "@zecos/validate"

const text = createInput(({helpers, state}) => {
    const {
      id,
      name,
      label,
      handleChange,
      handleBlur,
    } = helpers
    
    const {touched, errors, value} = state
    return (
      <div>
        <label htmlFor={name}>
          {label}: &nbsp;
        {touched && errors[0] && errors[0].toString()}
        </label>
        <input
          name={name}
          aria-label={label}
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
          id={id}
        />
      </div> 
    )
})

const Form = () => {
  const {FirstName, FirstNameDisplay} = text({
    name: "firstName",
    validate: validateName,
    init: "Bob",
  })

  return (
    <form className="form">
      <FirstName /><br />
      <FirstNameDisplay full={true} />
    </form> 
  )
}

export default Form