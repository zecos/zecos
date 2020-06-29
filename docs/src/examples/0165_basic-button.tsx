import React from 'react'
import { Button } from '@zecos/input-basic'

const Example = () => {
  const Btn = <Button
    label="You can also include the label as a property"
    onClick={e => {
      e.preventDefault()
      window.alert("as well as the onClick property")
    }}
  />
  return (
    <div style={{color: "#2E3440"}}> {/* color is inherited from the parent */}
      <Button
        onClick={e => {
          e.preventDefault()
          window.alert("You clicked me!")
        }}
      >
        Click Me
      </Button>
      {Btn}
    </div>
  )
}

export default Example