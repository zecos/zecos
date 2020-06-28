import React from 'react'
import { TimePickerInput } from '@zecos/input-picker'

const MultiForm = () => {
  const {AppointmentTime, AppointmentTimeDisplay} = TimePickerInput({
    init: new Date,
    name: 'appointmentTime'
  })
  
  return <div>
    <AppointmentTime />
    <AppointmentTimeDisplay />
    </div>
}

export default MultiForm