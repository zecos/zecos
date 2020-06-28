import React from 'react'
import { DatePickerInput } from '@zecos/input-picker'

const MultiForm = () => {
  const {AppointmentDate, AppointmentDateDisplay} = DatePickerInput({
    init: new Date,
    name: 'appointmentDate'
  })
  
  return <div>
    <AppointmentDate />
    <AppointmentDateDisplay />
    </div>
}

export default MultiForm