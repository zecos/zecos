import React, { useState } from 'react'
import { field } from '@zecos/field'
import { validateName } from "@zecos/validate"

const renderErrors = state => {
  const {touched, errors} = state
  if (touched && errors.length) {
    return (
      <span style={{color: "red"}}>
        {errors.map(err => <div>{err.toString()}</div>)}
      </span>
    )
  }
}

const Form = () => {
  const [[actions, state], _setFormState] = useState(() => {
    const _field = field({
      init: '',
      validate: validateName,
    })
    return [_field, _field.getState()]
  })
  
  const {
    setValue,
    setTouched,
    reset,
    setState,
    getState
  } = actions
  
  const setFormState = state => _setFormState([actions, state])
  
  const {
    errors,
    value,
    touched,
    pristine
  } = actions.getState()
  
  return (
    <form style={{padding: 20}}>
      <label htmlFor="name">Name: </label>&nbsp;
      <input
        name="name"
        value={value}
        onChange={e => setFormState(setValue(e.target.value))}
        onBlur={_ => setFormState(setTouched())}
      />
      <br />
      {renderErrors(state)}
    </form>
  )
}

export default Form
