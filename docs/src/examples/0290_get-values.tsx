import React from 'react'
import { validateName } from "@zecos/validate"
import { Text } from "@zecos/input-basic"
import { getValues } from '@zecos/util'

const SignInCmpt = () => {
    const { FirstName, firstName } = Text({
        validate: validateName,
        init: 'Harry',
        name: "firstName"
    })

    const { MiddleName,  middleName } = Text({
        validate: validateName,
        init: 'James',
        name: "middleName"
    })

    const { LastName,  lastName } = Text({
        validate: validateName,
        init: 'Potter',
        name: "lastName"
    })

    const items = [firstName, middleName, lastName]

    const singleValue = getValues(items, "firstName")
    const multipleValues = getValues(items, "firstName", "lastName")
    const alsoMultipleValues = getValues(items, ["firstName", "lastName"])
    const allValues = getValues(items)

    // output prettier
    const neatify = obj => <pre>{JSON.stringify(obj, null, 2)}</pre>

    return (
        <div>
            <FirstName />
            <MiddleName />
            <LastName />
            <br />
            Single Value: {neatify(singleValue)}
            <br />
            Multiple Values: {neatify(multipleValues)}
            <br />
            Also Multiple Values: {neatify(alsoMultipleValues)}
            <br />
            All Values: {neatify(allValues)}
        </div>
    )
}

export default SignInCmpt
