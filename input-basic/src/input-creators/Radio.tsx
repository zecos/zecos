import * as React from 'react'
import { createInput } from '@zecos/input'
import groupStyles from './group.css'
import styles from './Radio.css'

export const Radio = createInput(({helpers, props, state}) => {
  const {
    label,
    name,
    handleChange,
  } = helpers
  const { value } = state
  
  const { options } = props

  return (
    <div>
      <label htmlFor={name} className={styles.mainLabel}>
        {label}
      </label>
      {Object.entries(options).map(([label, val]) => {
        const _val:string = String(val)
        return (
          <div key={_val}>
          <label className={styles.radioContainer}>{label}
          <input
            type="radio"
            name={name}
            checked={_val === value}
            value={_val}
            onChange={handleChange}
          />
          <span className={styles.radio} />
          </label>
          </div>
        )
      })}
    </div>
  )
})