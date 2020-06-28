import React from 'react'
import { Text } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'
import { Button } from '@material-ui/core'


const Example = () => {
  const {FirstName, Display, log, logFirstName} = Text({
    name: "firstName",
    validate: validateName
  })
  
  return (
    <>
      <FirstName />
      <Display />
      <br />
      <Button variant="contained" onClick={log}>Log First Name Data</Button>
      <br />
      <br />
      <div>These two buttons are equivalent. Check the console.</div>
      <br />
      <Button variant="contained" onClick={logFirstName}>Log First Name Data</Button>
    </>
  )
}

export default Example