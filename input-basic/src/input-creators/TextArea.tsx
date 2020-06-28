import * as React from "react";
import styles from "./TextArea.css";
import groupStyles from "./group.css"
import { createInput } from "@zecos/input";

const renderError = error => <div className={styles.error}>{error.toString()}</div>
const renderErrors = errors => {
  if (!errors.length) {
    return ""
  }
  return (
    <div className={styles.errors}>
      {errors.map(renderError)}
    </div>
  )
}
export interface IOptions {
  rows?: number
}

export const TextArea = createInput(({helpers, state, props}) => {
  const {
    id,
    name,
    label,
    handleChange,
    handleBlur,
  } = helpers

  const { touched, errors, value } = state
  return (
    <div className={groupStyles.groupContainer}>
      <div className={groupStyles.formGroup}>
        <label className={styles.textAreaLabel} htmlFor={name}>
          {label}
        </label>
        {touched && renderErrors(errors)}
        {/* explicit better than implicit */}
        <textarea
          rows={props.rows || 3}
          className={styles.textArea}
          name={name}
          aria-label={label}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
        />
      </div>
    </div>
  )
})