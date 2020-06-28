import { FieldInput, IFieldActions, IFieldState, IFieldInputObject, IFieldSingleState, IFieldSingleActions } from './types'

export * from './types'

const memoize = fn => {
  const cache = {}
  return (...args) => {
    const key = JSON.stringify(args)
    if (cache[key]) {
      return cache[key]
    }
    return cache[key] = fn(...args)
  }
}

const noErrors = (val: any): [] => []
const getValidator = validate => {
  if (typeof validate == "undefined") {
    return noErrors
  }
  if (typeof validate === "function") {
    return validate
  }

  throw new Error(`validate must be a function, got a ${typeof validate}: ${validate}`)
}

const deepCopy = obj => JSON.parse(JSON.stringify(obj))

export const fields = (fieldsInput: FieldInput): IFieldActions => {
  let state: IFieldState = {}
  const validators = {}
  for (const fieldName in fieldsInput) {
    const {validate, init} = fieldsInput[fieldName]
    const validator = validators[fieldName] = memoize(getValidator(validate))
    state[fieldName] = {
      value: init,
      touched: false,
      pristine: true,
      errors: validator(init),
    }
  }
  const initialState = deepCopy(state)

  const setValue = (key: string, val: any): IFieldState => (state = {
    ...state,
    [key]: {
      errors: validators[key](val),
      value: val,
      pristine: false,
      touched: state[key].touched
    }
  })

  const setValues = (newVals): IFieldState => {
    for (const key in newVals) {
      setValue(key, newVals[key])
    }
    return state
  }
  
  const refreshErrors = () => {
    for (const fieldName in state) {
      state[fieldName].errors = validators[fieldName](state[fieldName].value)
    }
  }

  const resetFields = () => {
    state = deepCopy(initialState)
    refreshErrors()
    return state
  }

  const resetField = (key: string) => {
    state = {
      ...state,
      [key]: deepCopy(initialState[key])
    }
    state[key].errors = validators[key](state[key].value)
    return state
  }

  const setTouched = (key: string) => {
    if (state[key].touched) return state
    return (
      state = {
        ...state,
        [key]: {
          ...state[key],
          touched: true
        }
      }
    )
  }

  const getState = () => state
  const setState = state => (state = state)

  return {
    setValue,
    setValues,
    resetFields,
    resetField,
    setTouched,
    getState,
    setState,
  }
}

export const field = (fieldInput: IFieldInputObject): IFieldSingleActions => {
  const { validate, init } = fieldInput
  const validator = memoize(getValidator(validate))
  let state: IFieldSingleState = {
    value: init,
    touched: false,
    pristine: true,
    errors: validator(init),
  }
  const initialState = deepCopy(state)

  const setValue = (val: any): IFieldSingleState => (state = {
    errors: validator(val),
    value: val,
    pristine: false,
    touched: state.touched
  })
  const refreshErrors = () => (state.errors = validator(state.value), state)
  const reset = () => state = deepCopy(initialState)
  const setTouched = () => (state.touched = true, state)
  const getState = () => state
  const setState = state => (state = state)

  return {
    setValue,
    reset,
    refreshErrors,
    setTouched,
    getState,
    setState,
  }
}