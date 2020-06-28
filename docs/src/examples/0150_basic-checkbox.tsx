import React from 'react'
import { Checkbox } from '@zecos/input-basic'

const Example = () => {
  const { Cool, CoolDisplay } = Checkbox({
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