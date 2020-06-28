import React from 'react'
import { CheckboxInput } from '@zecos/input-mui'

const Example = () => {
  const { Cool, CoolDisplay } = CheckboxInput({
    init: true,
    name: "cool",
    label: "I am cool",
  })

  return (
    <div>
      <Cool />
      <CoolDisplay />
    </div>
  )
}

export default Example