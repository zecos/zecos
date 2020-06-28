import React from 'react'
import { Slider } from '@zecos/input-basic'

const Example = () => {
  const { Angle, AngleDisplay } = Slider({
    init: 0,
    name: "angle"
  })

  return (
    <div>
      <Angle
        min="0"
        max="90"
        step="0.5"
      />
      <AngleDisplay />
    </div>
  )
}

export default Example