## General @zecos/input derivative API

The inputs API exports 3 different of UI types

* [Inputs](#inputs)
* [Layouts](#layouts)
* [Multis](#multis)

These all mostly work the same way with slight difference between the 3.

All 3 take a "name" string, which is used to generate the label, id, and other properties of the form, and the all return the form component in UpperCamelCase, so you can use the component directly.

You can see in our first example that the `FirstName` variable is the actual form component.

```tsx
example:0000_overview
```

### Cmpt

All UI types return the Form UI component assigned to this UpperCamelCase variable.

They also return the same component, but assigned to the variable `Cmpt`. In our example, we could have replaced `FirstName` with `Cmpt, and it would have yielded the same result:


```tsx
example:0080_library-general
```

This is useful because if you are iterating through a list of inputs, you can just grab the component by the `Cmpt` key. However, you can also grab the UpperCamelCase name which means you can easily namespace your components with zero-cost. If you did not have the UpperCamelCase name component, it would add boilerplate to your code:

```tsx
const { Cmpt:FirstName } = ....
```

And, since the whole point of @zecos/input is to take boilerplate out of your code, this would be counter productive.

### Display

Aside from the `Cmpt`, all 3 UI types have a `Display` property, which simply displays the data for the input. This works recursively with `multi`s and `layout`s as well, which is useful for debugging.

In addition to the `Display` property, we can also see that we have a `FirstNameDisplay` component that can be used as well, which is the same thing as calling `Display`.

In our original example, we could replace both of our destructured properties with `Cmpt` and `Display` like this:

```tsx
example:0090_library-replaced
```

### log

Another property returned by the input creators is the `log` function. This is similar to `Display`, in that it is useful for debugging, but it logs the data to the console rather than displaying it. In addition to `log`, you also have access to `log[FieldName]` again, for convenient namespacing.

```tsx
example:0100_library-logging
```

### Moar

Aside from these, each of UI type (`input`, `layout`, and `multi`) have a `meta` field that describes it as an `input`, `layout`, or `multi`, that looks something like `{$$__input_type: 'input|layout|multi'}`. This is useful for parsing the form structure and will allow you to create your own tools and manner of dealing with form data.

There are also fields that are unique to each UI type (`input`, `layout`, and `multi`). `input` is mostly stuff describe the state of the form and actions you can take on the data. `layout` is just a consolidation of all different types displayed in a preset layout to help you create forms very fast. `multi` is for when you want to have multiple sets of the same data type. For example, you could have a list of people that all have a `firstName` data field.

These are described in greater detail below. Or you could checkout the actual [`@zecos/input`](/input/overview) page, but that is mostly for if you want to create your own UI library.


### Inputs

The `input` type is the workhorse of `@zecos/input`. It's the one that actually stores data. The rest just structure the data. The main two that unique fields are `state and actions as described below:

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
* `Cmpt`: The input component
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


### Layouts

`layout`s simply take a list of items which could be `input`s, `multi`s or even other `layout`s and creates a form from them called `Cmpt`. It also gives you the state of each of those `items` in the property `items`. You can also pass a validation function, which will be run with all of the inputs, and even if there is not an error on an individual input of a form, there can be an error for across multiple inputs. For instance, if there are two people with the same name on different inputs of the form, you could make that an error.

* `Cmpt`: The layout component
* `items`: an array of inputs/layouts/whatever else you want to accept
* `errors`:
  * array of errors returned by the `validate` function
  * every input/layout/multi has its own errors as well. But the group can also have its own errors.
* `meta`:
  * just an object with the information that it is a layout
  * it looks like this `{$$__input_type: 'layout'}`
* `name`: the original `name` option passed to the layout
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
* `[name + "Items"]`
  * same thing as `items`
  * if the `name` were `myForm`, then `[name + "Items"]` would be `"myformItems"`
* `[name + "Errors"]`: You get the picture
* `[name + "Meta"]`: ...
* `[name + "Helpers"]`: ....
* `[UpperCamelName + "Display"]`: ...
* `["log" + UpperCamelName]`: ...

### Multis

The API of `multi`s is similar to `layout`s, but they are very different. They both return a list of items that consist of `input`s or `layout`s you give them and a list of errors run by the validation function of the whole group of inputs, but you can additionally add or delete inputs from the `multi`, making it quite powerful.

So, if you had a list of fisherman, and you wanted to add another one dynamically (without specifying the total number of fishermen before), you could just `actions.push(newFishermanCallback)` to add another one to your group.

* `items`: an array of inputs/layouts/whatever you give to it
* `actions`: essentially the mutative `Array.prototype` functions adapted for the multi
  * `splice`:
    * similar to the [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) function
    * `(start: number, deleteCount: number, ...getCmpts: fn[]) => removedVals`
    * `start` is the index to start from
    * `deleteCount` is the number of items from index to remove
    * `...getCmpts` is the rest of the arguments that should be a callback that returns the new input to add, like the `newSimple` function in our example
  * `push`
    * similar to the [`Array.prototype.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) function
    * takes callbacks that return new items (layout or input)
    * `(...args: fn[]) => new length of items array`
  * `pop`
    * similar to the [`Array.prototype.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) function
    * removes and returns item from end of list
  * `sort`:
    * similar to the [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function
    * sorts list using given compare function
  * `shift`
    * similar to the [`Array.prototype.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) function
    * removes and returns first item of list
  * `unshift`
    * similar to the [`Array.prototype.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) function
    * `(...args: fn[]) => new length of items`
    * adds new items to beginning of list
    * takes callbacks that create new item, like the `newSimple` function in our example
  * `fill`
    * similar to the [`Array.prototype.fill`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) function
    * `(fn, start: number, end: number) =>`
    * takes call back that creates new item and creates new item for every position `start` to `end` in the array
* `errors`:
  * array of errors returned by the `validate` function
  * every input/layout/multi has its own errors as well. But the group can also have its own errors. In our example, `firstName` uses `nameValidator`, but we passed our own custom `validate` function in as well.
* `helpers`:
  * convience variable to help you create the multi
  * mostly just transformations of the name
  * `camel`: the form name in `camelCase`
  * `upperCamel`: the form nam in `UpperCamelCase`
  * `title`: the form name in `Title Case`
  * `snake`: the form name in `snake_case`
  * `kebab`: the form name in `kebab-case`
* `meta`:
  * just an object with the information that it is a `multi`
  * it looks like this `{$$__input_type: 'multi'}`
* `name`: the original `name` option passed to the `multi`
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
* `[name + "Items"]`
  * same thing as `items`
  * if the `name` were `myForm`, then `[name + "Items"]` would be `"myformItems"`
* `[name + "Errors"]`: You get the picture
* `[name + "Meta"]`: ...
* `[name + "Helpers"]`: ....
* `[UpperCamelName + "Display"]`: ...
* `["log" + UpperCamelName]`: ...