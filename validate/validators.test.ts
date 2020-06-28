import { test, /*describe, before, after, afterEach, beforeEach*/ } from 'tezt'
import {
    createBinaryHash,
    getHash,
    createMustContainValidator,
    createValidCharsValidator,
    createNumberValidator,
    createStringValidator,
    createOneOfValidator,
} from './validate';
import { validateEmail, validateDOB } from './index'
import expect from 'expect'


const vehicles = ['Motorcycle', 'Bus', 'Car'];

const testValidator = (fn, val, expectedVal, debug?) => {
  expect(
    fn(val)
  ).toEqual(expectedVal)
}

test('create binary hash', () => {
  const mustContain = ["letters", "digits", "uppercase"]
  const binaryHash = mustContain
    .reverse()
    .map(getHash)
    .reduce(createBinaryHash, {})
  expect(binaryHash["Z"]).toBe(0b101)
  expect(binaryHash["1"]).toBe(0b010)
  expect(binaryHash["z"]).toBe(0b100)
  const checkVal = parseInt("1".repeat(mustContain.length), 2)
  expect(binaryHash["Z"] | binaryHash["1"]).toBe(checkVal)
})

test('it detects valid chars', () => {
  const lowercaseValidator = createValidCharsValidator("lowercase")
  const uppercaseValidator = createValidCharsValidator("uppercase")
  testValidator(lowercaseValidator, "ubqoeribuqnerf", [])
  testValidator(lowercaseValidator, "ubqoeRIBUQNErf", [new Error(`R is not allowed. Only "lowercase" are allowed.`)])
  testValidator(uppercaseValidator, "ASDLFJALEKJFQWEK", [])
  testValidator(uppercaseValidator, "ubqoeRIBUQNErf", [new Error(`u is not allowed. Only "uppercase" are allowed.`)])
})

test('it detects must contain', () => {
  const mustContain = ["letters", "symbols", "#! "]
  const mustContainValidator = createMustContainValidator(mustContain)
  testValidator(mustContainValidator, "a!we #", [])
  testValidator(mustContainValidator, "aweasdqweq$", [new Error(`Must contain "#! "`)], true)
})

test('integration all checkers', () => {
  const passwordValidator = createStringValidator({
    mustContain: ["symbols", "uppercase", "lowercase", "digits"],
    validChars: ["symbols", "alphanumeric"],
    min: 8,
    max: 45,
  })
  testValidator(passwordValidator, "Password#1805", [])
  testValidator(passwordValidator, "passd05", [
    new Error(`Must contain "uppercase" and "symbols"`),
    new Error(`Must be at least 8 characters long.`),
  ])
})

test('use presets', () => {
  testValidator(validateEmail, "zwhit_chcox@gmail.com", [])
  testValidator(validateEmail, "password#1805", [new Error('Invalid input.')])
})

test('digits', () => {
  const numberValidator = createNumberValidator({
    min: 3,
    max: 9,
  })

  testValidator(numberValidator, 3, [])
  testValidator(numberValidator, 1, [new Error("Must be greater than or equal to 3.")])
  testValidator(numberValidator, 10, [new Error("Must be less than or equal to 9.")])
})

test('validateDOB', () => {
  testValidator(validateDOB, new Date(1920, 1,1), [])
  testValidator(validateDOB, new Date(1820, 1,1), [new Error("Date of birth cannot be before January 1, 1900")])
})

test("oneOf validator", () => {
  const fruitValidator = createOneOfValidator({options: ["apples", "oranges", "bananas"]})
  expect(fruitValidator("peanuts")).toEqual([new Error("Must be apples, oranges, or bananas.")])
  expect(fruitValidator("oranges")).toEqual([])
})