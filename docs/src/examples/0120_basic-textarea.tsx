import React from 'react'
import { validateName } from '@zecos/validate'
import { TextArea } from '@zecos/input-basic'

const Example = () => {
  const { DescribeYourself, DescribeYourselfDisplay } = TextArea({
    validate: validateName,
    init: 'I am a pretty cool dude...',
    name: "describeYourself"
  })

  return (
    <div>
      <DescribeYourself />
      <DescribeYourselfDisplay />
    </div>
  )
}

export default Example