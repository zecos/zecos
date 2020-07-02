import React from 'react'
import { validateUsername, validatePassword } from "@zecos/validate"
import { Text, SimpleForm } from "@zecos/input-basic"

const SignInCmpt = () => {
    const {SignIn, handleErrors /* with aliases Cmpt, signInHandleErrors */}  = SimpleForm({
        name: 'signIn',
        items: [
            Text({
                validate: validateUsername,
                name: "username",
                init: "", // defaults to blank
            }),
            Text({
                validate: validatePassword,
                name: "password",
                init: "",
            }),
        ],
        action: ({values}) => {
            return fetch("/api/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values())
            })
            .then(handleErrors) // handle errors automatically displays the error for you
            .then(() => window.location.href = "/") // redirect to home page, however you do that
            .catch(()=>{ /* already handled for you */})
        },
        loadingText: "Signing In..." // customize the button text while it's loading
    })

    return (
        <div style={{width: "400px", margin: "0 auto"}}>
            {SignIn}
        </div>
    )
}

export default SignInCmpt