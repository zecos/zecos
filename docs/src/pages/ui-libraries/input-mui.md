## @zecos/input-mui

`@zecos/input-mui` is an input UI library meant to play well with [Material UI](https://material-ui.com). `@material-ui/core` is a peer dependency, and it uses your installed version of `@material-ui/core` for its components. It's just plug and play, mix and match into your project. Each input has `Input` appended to differentiate them from the original material-ui components.

There are several input UI components exported by the library:

* [`TextInput`](#textinput)
* [`SelectInput`](#selectinput)
* [`RadioInput`](#radioinput)
* [`CheckboxInput`](#checkboxinput)
* [`SwitchInput`](#switchinput)
* [`SliderInput`](#sliderinput)
* [`GroupLayout`](#grouplayout)
* [`SimpleFormLayout`](#simpleformlayout)
* [`Multi`](#multi)




### Installation

```shell
yarn add @zecos/input @zecos/material-ui @material-ui/core
```

or

```shell
npm i -S @zecos/input @zecos/material-ui @material-ui/core
```

### TextInput

`TextInput` uses the [`TextField`](https://material-ui.com/components/text-fields/) material-ui component. Any `props` you pass will be forwarded to `TextField`.

```tsx
example:0060_text-input
```

### SelectInput

`SelectInput` uses the [`Select`](https://material-ui.com/components/selects/) material-ui component. You pass it an `options` prop, which is an object where the keys are the labels and the values are the values of the select field options. Any additional props are passed through to `Select`.

```tsx
example:0070_select-input
```

### RadioInput

`RadioInput` uses the [`Radio](https://material-ui.com/components/radio-buttons/) material-ui component. Similarly to [`SelectInput`](#selectinput), you pass an options prop, the keys of which will be the labels of the options, and the values the values. The prop `radioProps` is passed to the `Radio` component, with the rest being passed to the `RadioGroup`.

```tsx
example:0200_mui-radio
```

### CheckboxInput

`CheckboxInput` uses the [`Checkbox]() material-ui component. Any additional props are passed to the `Checkbox` component.

```tsx
example:0210_mui-checkbox
```

I have pre-checked that you are cool, because, obviously, you are if you are reading this. :)

### SwitchInput

`SwitchInput` uses the [`Switch`](https://material-ui.com/components/switches/) component from material-ui. Props are passed through to the `Switch` material-ui component.

```tsx
example:0220_mui-switch
```

### SliderInput


`SliderInput` uses the [`Slider`](https://material-ui.com/components/slider/) component from material-ui. You can pass an `orientation` of `"vertical"` to make a vertical slider. Any additional props are passed through to the `Slider` component.

```tsx
example:0230_mui-slider
```

### GroupLayout

You can also create a group of inputs with `GroupLayout`. Layouts are different from inputs. They just consolidate items and display them, returning the consolidated data to you. We can have a group of checkboxes like so:


```tsx
example:0240_mui-group-layout
```

### SimpleFormLayout

`SimpleFormLayout` takes a list of items and turns them into an actual form. Any extra props you give it are given to the `form` element. You can also pass `buttonProps`, and those props are passed to the submit `Button`.

The default button props are

```tsx
{
  type: "submit",
  variant: "outlined",
}
```

Now, let's put all of that stuff together with `SimpleFormLayout` and create an actual form

```tsx
example:0250_mui-simple-form-layout
```

### Multi

`Multi` simply enables you to create multiple layouts or inputs. For info on the API see the [general](/ui-libraries/general#multis) section.


```tsx
example:0260_mui-multi
```