import React from 'react'
import { Text } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'


const Example = () => {
  const {Display, FirstName, Cmpt, FirstNameDisplay} = Text({
    name: "firstName",
    validate: validateName
  })
  console.log("display", Display)
  
  return (
    <>
      <FirstName />
      <Cmpt />  {/* same as above line */}
      <Display full={true} />
      <FirstNameDisplay full={true} /> {/* same as above line */}
      <FirstNameDisplay /> {/* Without the "full" property, it just gets the value */}
    </>
  )
}

export default Example