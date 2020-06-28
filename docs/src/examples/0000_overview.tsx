import React from 'react'
import { Text } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'


const Example = () => {
  const {FirstNameDisplay, FirstName} = Text({
    name: "firstName",
    validate: validateName
  })
  
  return (
    <>
      <FirstName /> {/* form input */}
      <FirstNameDisplay full={true} />
    </>
  )
}

export default Example