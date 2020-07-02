import * as React from 'react'
import { createLayout } from '@zecos/input'
import styles from './SimpleForm.css'
import { Button } from './Button'
import { camelToTitle, camelToUpperCamel, hasItemErrors, getValues } from '@zecos/util'

const renderError = (error, i) => {
  <div className={styles.red} key={i}>{error}</div>
}

const renderErrors = (err) => {
  if (Array.isArray(err)) {
    return <>{err.map(renderError)}</>
  } else {
    return renderError(err, null)
  }
}

export const SimpleForm = opts => {
  const name = opts.name
  const title = camelToTitle(name)
  const upperCamel = camelToUpperCamel(name)
  const [attemptedWithErrors, setAttemptedWithErrors] = React.useState(false)
  const [serverErrors, setServerErrors] = React.useState([] as any[])
  const handleSubmit = opts.onSubmit ? (e) => {
    e.preventDefault()
    if (hasItemErrors(opts.items).length) {
      setAttemptedWithErrors(true)
      return
    }
    setAttemptedWithErrors(false)
    const values = (...args) => getValues(opts.items, ...args)
    const result = opts.action({items: opts.items, values})
    if (isPromise(result)) {
      setState("loading")
      if (opts.catchErrors) {
        result.catch(e => {
          if (typeof e === "string") {
            try {
              e = JSON.parse(e)
            } catch {}
          }
          if (Array.isArray(e)) {
            setServerErrors(e)
          } else if (typeof e === "string") {
            setServerErrors([e])
          } else {
            if (typeof e  === "object" && typeof e.message === "string") {
              setServerErrors([e])
            }
          }
        })
      }
      result
        .finally((e) =>{
          setState("normal")
        })
    }
  } : undefined
  const [state, setState] = React.useState("normal")
  const Cmpt =  (
    <form onSubmit={handleSubmit}>
      <h3 className={styles.heading}>{title}</h3>
      {state === "loading" ? opts.loadingText || "Loading..." : ""}
      {opts.errors.length ? renderErrors(opts.errors) : ""}
      <div className={styles.red}>Please fix errors to continue.</div>
      {opts.items.map((Input, i) => (
        // if it is a @zecos/input component, add the component, otherwise
        // leave as is
        typeof Input.Cmpt !== "undefined" ?
          <span key={i}><Input.Cmpt key={i} /></span> :
          <span key={i}>{Input}</span>
      ))}
      <Button onClick={handleSubmit}>{opts.submitButtonText || opts.title}</Button>
    </form>
  )
  return {
    Cmpt,
    [upperCamel]: Cmpt,
    items: opts.items,
    [`${upperCamel}Items`]: opts.items,
  }
  
}

function isPromise(value) {
  return value && value.then && typeof value.then === 'function';
}

