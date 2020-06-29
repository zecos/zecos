import * as React from 'react'
import { createLayout } from '@zecos/input'
import styles from './SimpleFormLayout.css'


export const SimpleFormLayout = createLayout(({props, items, helpers}) => {
  return (
    <form {...props}>
      <h3 className={styles.heading}>{helpers.title}</h3>
      {items.map((Input, i) => (
        // if it is a @zecos/input component, add the component, otherwise
        // leave as is
        typeof Input.Cmpt !== "undefined" ?
          <span key={i}><Input.Cmpt key={i} /></span> :
          <span key={i}>{Input}</span>
      ))}
    </form>
  )
})

