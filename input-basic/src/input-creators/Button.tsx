import * as React from "react"
import styles from "./Button.css"
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

export const Button = props => {
    const {label, onClick, ...otherProps} = props

    return (
        <div className={groupStyles.groupContainer}>
        <div className={groupStyles.formGroup}>
            <button
                className={styles.button}
                onClick={props.onClick}
                name={name}
                aria-label={props.label || ""}
                {...otherProps}
            >
                {props.children || props.label}
            </button>
        </div>
        </div>
    )
}

export interface IOptions {
  actions: ReactFieldSingleActions
  state: IFieldSingleState
  name: string
}

