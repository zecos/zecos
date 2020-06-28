import * as React from 'react'
import { createLayout } from '@zecos/input'
import styles from './SimpleFormLayout.css'


export const SimpleFormLayout = createLayout(({props, items, helpers}) => {
  return (
    <form {...props}>
      <h3 className={styles.heading}>{helpers.title}</h3>
      {items.map((Input, i) => (
        <span key={i}><Input.Cmpt key={i} /></span>
      ))}
    </form>
  )
})

