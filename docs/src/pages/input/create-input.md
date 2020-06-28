## @zecos/input - `createInput`

`@zecos/input` is a library for quickly creating React UI components with little to no boilerplate.

### Installation

`yarn add @zecos/input`

`npm i -S @zecos/input`

### Example

```tsx
example:0020_create-input
```

For full example, see the [@zecos/input-basic code](https://github.com/zecos/input-basic/blob/master/src/input-creators/Text.tsx), or better yet, fork it and create your own UI!

### How it works

`createInput` takes a functional component that takes an object with the following properties:

* `props`: Properties actually passed to the component
  * in our example, it would look something like `<FirstName x="hello" />`, and `props` would be `{x: "hello"}`
* `state`: the field state, which includes
  * `value`: value of the field
  * `touched`: whether or not the user has focused and blurred the input
  * `errors`: the errors returned by your `validate` function
  * `pristine`: whether or not the field data has been manipulated
* `actions`:
  * `getState`: returns `state` (the same thing as above)
  * `setValue`: set the value of the field (also runs validation and sets pristine to false)
  * `reset`: sets the field back to its original state (pristine, untouched, with the original init values)
  * `setTouched`: set the `touched` value to `true`
* `helpers`: premade functions and properties to make your life easier
  * `camel`: the form name in `camelCase`
  * `upperCamel`: the form nam in `UpperCamelCase`
  * `title`: the form name in `Title Case`
  * `snake`: the form name in `snake_case`
  * `kebab`: the form name in `kebab-case`
  * `aria-label`: the form name in title case (for convenience)
  * `handleChange`: a function that sets the field value to the event's target value
  * `handleBlur`: a function that sets the field's `touched` property to `true`
  * `label`: the form name in title case (for convenience)
  * `name`: the form name in snake case (for convenience)
  * `htmlFor`: same as `name`
  * `id`: the form name in snake case (for convenience)
  
The consumer is then passed your input, along with the form state and actions:

```ts
const {FirstName, firstNameState, firstNameActions} = Text({
  name: "firstName",
  validate: nameValidator,
  init: "Bob",
})
```

The consumer can read all the values you can from `state` or perform any of the actions you can with `actions`, and each time your form will be rerendered. This gives you all the benefits of customization and and convenience of automatic generation.

The first argument given to `Text` (`{name: "firstName", ...}`) are consumed by `createInput` and are used to generate the `helpers`/`state`/`actions` properties.

* `name`: is the name given to the form.
  * it is *crucial* that this is in camelcase in order to generate the proper title case, snake case, etc.. Make sure you communicate this to the consumer of your form library.
  * this is required
* `validate`: should be a function that takes the form value and outputs an array of errors.
  * not required (if no validation is required)
  * works very will with the [`@zecos/validate`](/general/validate) library
* `init`: initial value for the field
  * default is `""` (empty string)
  * if your input requires a number, make sure to change `""` to 0, likewise with other types `""` would be invalid for.
* `props`: initial properties for the field
  * these can be overriden by props passed to the generated component
  * these cannot be changed after initiation (at the moment, [open an issue](https://github.com/zecos/input/issues/new) if this is crucial for you)

### Select Example

To demonstrate the power an flexibility of these options, let's take a look at a select input.

```tsx
example:0030_create-input-select
```

Here, you can see we can either pass options through the initializer or through the props of the React component, and we can let our component decide which one to use.

### What it looks like for the consumer

So, let's say that your user has passed in his options to your input creator, what does he get back?

He would get an object with the following properties:

* `Cmpt`: The input component
* `state`: The same `state` that you were passed
* `actions`: The same `actions` that you were passed
* `meta`:
  * just an object with the information that it is a input
  * it looks like this `{$$__input_type: 'input'}`
* `name`: the original `name` option passed to the input
* `Display`:
  * displays the data in a react component
  * mostly for debugging purposes
  * can pass `{full: true}` to get full state information
* `log`:
  * logs the input data to the console
  * can pass `{full: true}` to get full state information
* `[UpperCamelName]`:
  * same thing as `Cmpt`
  * for convenience and namespacing
  * You don't want a million components called `Cmpt`
  * but you also want to be able to get the component without knowing its name
* `[name + "State"]`
  * same thing as `state`
  * if the `name` were `firstName`, then `[name + "State"]` would be `"myformState"`
* `[name + "Meta"]`: ...
* `[name + "Actions"]`: ...
* `[name + "Helpers"]`: ....
* `[UpperCamelName + "Display"]`: ...
* `["log" + UpperCamelName]`: ...

And that's it. I would put the example here again, but that wouldn't be DRY (don't repeat yourself). Feel free to scroll up though. For more examples, checkout the [@zecos/input-basic code](https://github.com/zecos/input-basic).