import React from 'react'
import { SliderInput } from '@zecos/input-mui'

const Example = () => {
  const {Temperature, TemperatureDisplay} = SliderInput({
    init: 30,
    name: 'temperature',
    props: {
      min: 0,
      max: 100,
      step: 10,
      marks: [...new Array(11)]
        .map((_, num) => ({
          label: `${num * 10}°C`,
          value: num * 10
        })),
    }
  })
  
  const {TemperatureVertical, TemperatureVerticalDisplay} = SliderInput({
    init: 30,
    name: 'temperatureVertical',
    props: {
      min: 0,
      max: 100,
      step: 10,
      orientation: "vertical",
      marks: [...new Array(11)]
        .map((_, num) => ({
          label: `${num * 10}°C`,
          value: num * 10
        })),
    }
  })

  return (
    <div>
      <Temperature />
      <br />
      <TemperatureVertical />
      <TemperatureDisplay />
      <TemperatureVerticalDisplay />
    </div>
  )
}

export default Example