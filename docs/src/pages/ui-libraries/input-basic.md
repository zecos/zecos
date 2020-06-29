## @zecos/input-basic

I wrote `@zecos/input-basic` partially just to have a simple, small (<1KB) library that you could easily get started with without any dependencies or setup. But the second reason was that it would be extremely easy to [fork](https://github.com/zecos/input-basic) and create your own library as well from scratch.

If you are looking for the basics of `@zecos/input` libraries, the [general page](/ui-libraries/general) page is a better place to start. Although, it *might* be easier to just get a feel for the library first with this page. That's up to you though.

There are several Input UI components, although, there will be more added in the future, but still maintaining its tiny size:

* [`Text`](#text)
* [`TextArea`](#textarea)
* [`Select`](#select)
* [`Slider`](#slider)
* [`Checkbox`](#checkbox)
* [`Radio`](#radio)
* [`Button`](#button)
* [`GroupLayout`](#grouplayout)
* [`SimpleFormLayout`](#simpleformlayout)
* [`Multi`](#multi)

### Installation

```shell
yarn add @zecos/input @zecos/input-basic
```

or

```shell
npm i -S @zecos/input @zecos/input-basic
```

### Text

`Text` is the most basic form input that `@zecos/input-basic` provides. It's simply a text field. There's not much to say other than that.

```tsx
example:0110_basic-text
```

### TextArea

`TextArea` is the secondmost basic form input:

```tsx
example:0120_basic-textarea
```

### Select

`Select` takes a list of options and provides a dropdown list from which to select:

```tsx
example:0130_basic-select
```

### Slider

`Slider` is a simple slider. You can provide `min`, `max`, and `step` properties if you wish. The defaults are `min=0`, `max=100`, `step=1`:

```tsx
example:0140_basic-slider
```

### Checkbox

`Checkbox` is an input with the value `true` or `false` depending on whether the checkbox is checked orn ot.

```tsx
example:0150_basic-checkbox
```

### Radio

`Radio`, similarly to [`Select`](#select) receives a list of options, but outputs a radio list instead:

```tsx
example:0160_basic-radio
```

### Button

`Button` is a simple button included to provide UI consistency in your buttons:

```tsx
example:0165_basic-button
```

### GroupLayout

`GroupLayout`, as the name implies, is a [layout](/ui-libraries/general#layouts) rather than an [input](/ui-libraries/general#inputs). This means that it simply groups all the inputs you give it together and returns them as an array.

In addition, you can run error-checking on the group as a whole rather than just individual inputs.

```tsx
example:0170_basic-group-layout
```

### SimpleFormLayout

`SimpleFormLayout` is another layout, only instead of just grouping inputs together, it actually creates a form with the inputs. Let's combine all the previous examples into one form, and we can begin to glimpse the power of `@zecos/input`.

```tsx
example:0180_basic-simple-form-layout
```

### Multi

`Multi` is also a different breed from the inputs and layouts. It allows you to create an array of inputs. You can `push`, `pop`, `splice`, `fill`, etc. just like you would a regular array, only you pass a callback that creates an input to these functions instead of passing the data directly.

For instance, we could create an array of people:

```tsx
example:0190_basic-multi
```

You might have to create your own `multi` if you want to customize where you can remove people and such, but that's pretty easy. The code for this `multi` is very simple:


```tsx
import * as React from 'react'
import { createMulti } from '@zecos/input'
import styles from './Multi.css'

export const Multi:any = createMulti(({items, helpers}) => {
  return <div>
    <h3 className={styles.heading}>{helpers.title}</h3>
    {items.map((Input, i) => <Input.Cmpt key={i} />)}
  </div>
})
```

So, you see how you could easiy add a delete button or something.

Here's an example with a custom `Multi`:

```tsx
example:0050_create-multi
```