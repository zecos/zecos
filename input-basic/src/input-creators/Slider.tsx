import * as React from 'react'
import { createInput } from "@zecos/input"
import styles from "./Slider.css";
import groupStyles from "./group.css";

export const Slider = createInput(({helpers, state, props}) => {
  const min = props.min || 0
  const max = props.max || 100
  const step = props.step || 1
  const { value } = state
  const {
    handleChange,
    handleBlur,
    id,
    label,
  } = helpers
  return (
    <div className={groupStyles.formGroup}>
      <label className={styles.textLabel} htmlFor={name}>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles.sliderInput} ${props.className}`}
        id={id}
      />
  </div>
  )
})