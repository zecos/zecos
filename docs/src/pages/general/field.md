### field

`field` is a form state management tool that integrates well with
* [React](https://reactjs.org/)
* [vanilla](http://vanilla-js.com/)
* \* whatever you happen to be using

It's a minimalistic library with only [~60 LoC](lib.ts) and follows functional programming pattern.

It's also heckin' easy to use.

The first step is to declare your field properties:

```ts
import { validateName } from "validate"

const fieldProperties = {
  init: "",
  validate: validateName
}
```

Field properties consist of two values:

* `init`: initial value for the field
* `validate`: validation function that returns array of errors

This library is designed to integrate well with [@zecos/validate](/validate),
but you can feel free to use whatever validation functions you want like in `customField`.

Next, we instantiate our field using the `field` function:
```ts
import { field } from 'field'
// fieldProperties

const { getState } = field(fieldProperties)
const state = getState()
```

You can see `field` returns a function called `getState`.

`getState` does just what it sounds like: gets state.

`state` is the initial state of our fields. It's just data.

For our field properties, it would be something like this:

```ts
{
  errors: [],
  touched: false,
  pristine: true,
  value: ''
}
```

There are 4 state properties

* `errors`: their array of errors (possibly empty) based on the current value
* `value`: their current value
* `touched`: boolean: whether they have been "touched" or not (the value has been adjusted, and the `input` has lost focus)
* `pristine`: a boolean value indicating whether or not the fields have been manipulated at all

Quite simple, but how do we manipulate state?

Well, for that, we'll turn to our actions:

```ts
const { getState, ...actions } = field(fieldProperties)
const { setValue, setValues, setTouched, resetField, resetFields, setState } = actions
```

Each action adjusts state and then returns the new state:

* `setValue`:
  * takes `value`
  * validates the data sets `errors` to any returned errors from the validate
  * sets pristine to `false` if not already set
* `setTouched`: sets field's `touched` property to true if not already set
* `resetField`: sets a field's properties to their original value
* `setState`:
  * sets the internal `field` state
  * hopefully, you'll never need this

But enough of the theory, let's see it in action.

You could see something like this:

```tsx
example:0010_field
```

Although, your version would probably be much shorter, because I included a lot of things that were not used just for illustration purposes.

