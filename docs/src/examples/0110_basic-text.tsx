import React from 'react'
import { validateName } from '@zecos/validate'
import { Text } from '@zecos/input-basic'

const Example = () => {
  const { FirstName, FirstNameDisplay } = Text({
    validate: validateName,
    init: 'Harry',
    name: "firstName"
  })

  return (
    <div>
      <FirstName />
      <FirstNameDisplay />
    </div>
  )
}

export default Example