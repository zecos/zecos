import * as React from 'react'
import styles from './SimpleForm.css'
import { Button } from './Button'
import { camelToTitle, camelToUpperCamel, hasItemErrors, getValues } from '@zecos/util'

const renderError = (error, i) => <div className={styles.red} key={i}>{error}</div>

const renderErrors = (err) => {
  if (Array.isArray(err)) {
    return <>{err.map(renderError)}</>
  } else {
    return renderError(err, null)
  }
}

// TODO: move to util and merge with validation error processing
// also should give example for custom error validation
const processError = (err) => {
  if (typeof err === "string") {
    try {
      err = JSON.parse(err)
    } catch {}
  }
  if (Array.isArray(err)) {
    return err
  } else if (typeof err === "string") {
    return [err]
  } else if (typeof err  === "object" && typeof err.message === "string") {
    return [err.message]
  } else {
    console.error("couldn't parse error", err)
  }
  return undefined
}

interface IGenericObject {
  [key: string]: string
}

interface IActionCallbackArgs {
  items: any,
  values: (name?: string, ...names: string[]) => IGenericObject
}

interface IOptions {
  [key: string]: any,
  action?: (IActionCallbackArgs) => any
}

export const SimpleForm = (opts: IOptions) => {
  const name = opts.name
  const title = camelToTitle(name)
  const upperCamel:string  = camelToUpperCamel(name)
  const props = opts.props || {}

  const [attemptedWithErrors, setAttemptedWithErrors] = React.useState(false)
  const [serverErrors, setServerErrors] = React.useState([] as any[])
  const handleErrors = resp => {
    if (resp.status > 399) {
      resp.text().then((err) => {
        err = processError(err)
        if (err) {
          setServerErrors(err)
        }
      })
      return Promise.reject(title + " error")
    } else {
      return resp
    }
  }
  const handleSubmit = opts.action ? (e) => {
    e.preventDefault()
    if (hasItemErrors(opts.items).length) {
      setAttemptedWithErrors(true)
      return
    }
    setAttemptedWithErrors(false)
    const values = (...args) => getValues(opts.items, ...args)
    const actionCallbackArgs: IActionCallbackArgs = {
      items: opts.items,
      values,
    }
    const result = (opts.action as any)(actionCallbackArgs)
    if (isPromise(result)) {
      setIsLoading(true)
      if (opts.catchServerErrors !== false) {
        result
      }
      result
        .finally((e) =>{
          setIsLoading(false)
        })
    }
  } : undefined
  const [isLoading, setIsLoading] = React.useState(false)
  const setValues = newVals => {
    for (const key in newVals) {
      const items = opts.items.filter(item => (
        item.helpers.snake === key ||
        item.name === key ||
        item.helpers.kebab === key
      ))
      if (!items.length) {
        throw new Error(`No item called ${key}`)
      }
      items[0].actions.setValue(newVals[key])
    }
  }


  const Cmpt = (
    <form onSubmit={handleSubmit} {...props}>
      <h3 className={styles.heading}>{title}</h3>
      {(opts.errors && opts.errors.length) ? renderErrors(opts.errors) : ""}
      {serverErrors.length ? renderErrors(serverErrors) : ""}
      {attemptedWithErrors ? <div className={styles.red}>Please fix errors to continue.</div> : ""}
      {opts.items.map((Input, i) => (
        // if it is a @zecos/input component, add the component, otherwise
        // leave as is
        typeof Input.Cmpt !== "undefined" ?
          <span key={i}><Input.Cmpt key={i} /></span> :
          <span key={i}>{Input}</span>
      ))}
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
      >
      {isLoading ? opts.loadingText || "Loading..." : opts.submitButtonText || title}
      </Button>
    </form>
  )
  return {
    Cmpt,
    [upperCamel]: Cmpt,
    handleErrors,
    setValues,
    [`${name}HandleErrors`]: handleErrors,
  }

}

function isPromise(value) {
  return value && value.then && typeof value.then === 'function';
}

