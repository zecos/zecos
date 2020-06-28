import React from 'react'
import { createInput } from '@zecos/input'

const renderOption = ([key, label]) => {
  return (
    <option key={key} value={key}>
      {label}
    </option>
  )
}

export const select = createInput(({helpers, props}) => {
  const {
    id,
    name,
    value,
    handleChange,
    handleBlur,
    label,
    htmlFor,
  } = helpers

  return (
    <div>
      <label htmlFor={htmlFor}>
        {label}: &nbsp;
      </label>
      <select
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        id={id}
        value={value}
        aria-label={label}
      >
        {Object.entries(props.options).map(renderOption)}
      </select>
    </div>
  )
})

export const Form = () => {
  const {FavoriteColor, FavoriteColorDisplay} = select({
    init: "blue",
    name: "favoriteColor",
    props: {
     options: {green: "Green", blue: "Blue"} 
    }
  })

  return (
    <form className="form">
      <FavoriteColor options={{blue: "Blue", red: "Red"}} />
      <FavoriteColorDisplay />
    </form>
  )
}

export default Form