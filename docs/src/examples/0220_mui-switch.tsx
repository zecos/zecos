import React from 'react'
import { SwitchInput } from '@zecos/input-mui'

const Example = () => {
  const {Light, LightDisplay, state } = SwitchInput({
    init: false,
    name: "light",
  })
  
  const style = {
    background: state.value ? "yellow" : "black",
    color: state.value ? "black" : "white",
    padding: 15,
    borderRadius: 4,
  }

  return (
    <div style={style}>
      <Light />
      <LightDisplay />
    </div>
  )
}

export default Example