import { test, before, describe, /*after, afterEach, beforeEach*/ } from 'tezt'
import { fields, field } from './lib'
import { nameValidator } from 'validatorz'
import expect from "expect"

const fieldProperties = {
  firstName: {
    init: "",
    validate: nameValidator
  },
  customField: {
    validate: (val: string) => {
      if (val !== "hello") {
        return [new Error("value must be hello!")]
      }
      return []
    },
    init: "this is my init value"
  }
}

const initExpected = {
  firstName: { errors: [new Error("Must be at least 1 characters long.")], touched: false, pristine: true, value: '' },
  customField: {
    errors: [new Error("value must be hello!")],
    touched: false,
    pristine: true,
    value: 'this is my init value'
  }
}

let setValue, setTouched, setValues, resetFields, resetField;
before(() => {
  const {getState, ...actions} = fields(fieldProperties)
  setValue = actions.setValue
  setTouched = actions.setTouched
  setValues = actions.setValues
  resetFields = actions.resetFields
  resetField = actions.resetField
})

describe("field", () => {
  test("it initializes", () => {
    const { getState } = fields(fieldProperties)
    const state = getState()
    expect(state).toEqual(initExpected)
  })

  test("it shows correct error", () => {
    expect(setValue("firstName", "Zane")).toEqual({
      firstName: { errors: [], touched: false, pristine: false, value: 'Zane' },
      customField: {
        errors: [new Error("value must be hello!")],
        touched: false,
        pristine: true,
        value: 'this is my init value'
      }
    })
  })

  test("it handles multiple values set and touched", () => {
    expect(setTouched("firstName").firstName.touched).toBe(true)
    expect(resetField("firstName").firstName.touched).toBe(false)
    expect(setValue("customField", "hell").customField.errors).toEqual([new Error("value must be hello!")])
    expect(setValue("firstName", "Zane")).toEqual({
      firstName: { errors: [], touched: false, pristine: false, value: 'Zane' },
      customField: { errors: [new Error("value must be hello!")], touched: false, pristine: false, value: 'hell' }
    })
  })

  test("it resets all fields and sets them back again", () => {
    expect(resetFields()).toEqual(initExpected)
    expect(setValues({
      firstName: "Todd",
      customField: "hello",
    })).toMatchObject({
      firstName: {
        value: "Todd",
      },
      customField: {
        value: "hello",
        errors: [],
      }
    })
  })
})

describe("field, singluar", () => {
  const firstName = field(fieldProperties.firstName)
  test("initialize", () => {
    expect(firstName.getState()).toEqual(initExpected.firstName)
  })
  
  test("set error properly", () => {
    firstName.setValue("Zane")
    expect(firstName.getState().errors).toEqual([])
  })
  
  test("it handles multiple values set and touched", () => {
    expect(firstName.setTouched().touched).toBe(true)
    expect(firstName.reset().touched).toBe(false)
    expect(firstName.setValue("Zane")).toEqual({
      errors: [],
      touched: false,
      pristine: false,
      value: 'Zane',
    })
  })
})
