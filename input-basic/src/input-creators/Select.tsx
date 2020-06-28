import * as React from "react"
import styles from "./Select.css"
import groupStyles from "./group.css"
// import { ReactFieldSingleActions } from "@zecos/input"
import { IFieldSingleState } from '@zecos/field'
import { createInput } from "@zecos/input";


const renderOption = ([label, value]) => {
  return (
    <option key={value} value={value}>
      {label}
    </option>
  )
}

interface ReactFieldSingleActions {
  setValue: (newVal) => any
  reset: () => any
  setTouched: () => any
  refreshErrors: () => any
  getState: () => any
}

export const Select = createInput(({helpers, props, state}) => {
  const {
    id,
    name,
    handleChange,
    handleBlur,
    label,
  } = helpers

  const { value } = state
  return (
    <div className={groupStyles.groupContainer}>
      <div className={groupStyles.formGroup}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <select
          className={styles.selectGroup}
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
    </div>
  )
})

export interface IOptions {
  actions: ReactFieldSingleActions
  state: IFieldSingleState
  name: string
}
