## @zecos/inputs `createMulti`

So, we've covered creating an input which simplifies the process of creating, maintaining, and displaying state. We've also covered how we can compose those inputs into a layout to simplify the process of organizing those inputs.

But what say we want to create a bunch of the same thing.

For instance, say we wanted a list of people. What would that look like.

Looking back at our first example, we could create one easily enough:

```tsx
const Form = () => {
  const {FirstName, FirstNameDisplay} = text({
    name: "firstName",
    validate: validateName,
    init: "",
  })

  return (
    <form className="form">
      <FirstName /><br />
      <FirstNameDisplay full={true} />
    </form> 
  )
}
```

But how would we create the second one?

I guess you would have to just add a second text input:

```tsx
const Form = () => {
  const {FirstName, FirstNameDisplay} = text({
    name: "firstName",
    validate: validateName,
    init: "",
  })
  const {SecondFirstName, SecondFirstNameDisplay} = text({
    name: "secondFirstName",
    validate: validateName,
    init: "",
  })

  return (
    <form className="form">
      <FirstName /><br />
      <SecondFirstName /><br />
      <FirstNameDisplay full={true} />
      <SecondFirstNameDisplay full={true} />
    </form> 
  )
}
```

But what if we don't know how many people we wanted to create? How could we dynamically add and delete people?

Well, the answer is it's impossible, or at least really, really difficult with the current tools we have and without using hacks/workarounds.

That's where `createMulti` comes in.

Let's looks at a full example.

### Example

```tsx
example:0050_create-multi
```

### How it works

The main thing we're introducing here is the `Multi` variable.

```tsx
const Multi:any = createMulti(({items}) => {
  return <>
    {items.map((Input, i) => <Input.Cmpt key={i} />)}
  </>
})
```

I've gone ahead and started using inputs from [`@zecos/input-mui`](/input/input-mui), because if I created everything from scratch, that example would be a whole lot longer, and we've already covered that anyway.

You can see this example is very simple, it just returns the inputs essentially. All the other work is down for you. However, you could make this as complicated or as simple as you wanted.

The `createMulti` function gets an array of items that could be either inputs or layouts. And down below, we can see the consumer of `Multi` gets an object which contains the actions, and we use `actions.push` to add new items to the list.

```tsx
actions.push(newSimple)
```

The object passed to the callback you passed to `createMulti` contains the following properties:

* `items`: an array of inputs/layouts/whatever else you want to accept
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
* `props`:
  * the `props` passed to the options of the multi
  * those props are overridden/combined with props passed to the actual multi react component
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

You can use these properties to display the components however you want and create buttons and other interactive components using the `actions`
  

### What it looks like for the consumer

The consumer receives properties much like in [`createInput`](/input/create-input) and [`layout`](/input/create-layout):


* `Cmpt`: The multi component
* `items`: The same items that were passed to you
* `actions`: The same actions that were passed to you
* `errors`: The same errors that were passed to you
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

And that's a wrap for the `multi`s. No go forth and `multi`ply.