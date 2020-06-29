## @zecos/input - `createLayout`

`createLayout` functions much the same way as [`createInput`](/input/create-input), except it does not create an input, it creates a layout for inputs passed to it.

It also consolidates the state of all the inputs

### Example

```tsx
example:0040_create-layout
```

### How it works

`createLayout` is very simple. Your component is passed an object with the following properties:

* `items`: an array of inputs/layouts/whatever else you want to accept
* `errors`:
  * array of errors returned by the `validate` function
  * every input/layout/multi has its own errors as well. But the group can also have its own errors. In our example, `firstName` uses `nameValidator`, but we passed our own custom `validate` function in as well.
* `props`:
  * the `props` passed to the options of the layout
  * those props are overridden/combined with props passed to the actual layout react component
* `helpers`:
  * convience variable to help you create the layout
  * mostly just transformations of the name
  * `camel`: the form name in `camelCase`
  * `upperCamel`: the form nam in `UpperCamelCase`
  * `title`: the form name in `Title Case`
  * `snake`: the form name in `snake_case`
  * `kebab`: the form name in `kebab-case`
  
Then, you can do whatever you want with those things and make them look pretty for the consumer. This is meant so the user doesn't have to add a bunch of layout boiler plate while creating forms. It doesn't have to be really complicated.

### What it looks like for the consumer

So, let's say that your user has passed in her options to your layout creator, what does she get back?

She would get an object with the following properties:

* `Cmpt`: The layout component
* `items`: The same items that were passed to you
* `errors`: The same errors that were passed to you
* `get`:
  * convenience method that gets the value of the item by name
  * E.g. `myform.get("firstName")` would simply return the value
  * also can return an object if an array of names are returned
  * E.g. `myform.get("firstName", "lastName")` might return `{firstName: "Zane", lastName: "Hitchcox"}`
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
* `[name + "Get"]`: ...
* `[name + "Meta"]`: ...
* `[name + "Helpers"]`: ....
* `[UpperCamelName + "Display"]`: ...
* `["log" + UpperCamelName]`: ...

And that's it. I would put the example here again, but that wouldn't be DRY (don't repeat yourself). Feel free to scroll up though.