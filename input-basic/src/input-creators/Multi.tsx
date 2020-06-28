import * as React from 'react'
import { createMulti } from '@zecos/input'
import styles from './Multi.css'

export const Multi:any = createMulti(({items, helpers}) => {
  return <div>
    <h3 className={styles.heading}>{helpers.title}</h3>
    {items.map((Input, i) => <Input.Cmpt key={i} />)}
  </div>
})
