## @zecos/input-picker

`@zecos/input-picker` simply creates time and date pickers using [`@material-ui/pickers`](https://material-ui.com/components/pickers/) to export `DatePickerInput` and `TimePickerInput`.

This library has peer dependencies of 

* [`@material-ui/core`](https://material-ui)
* [`@date-io/date-fns`](https://www.npmjs.com/package/@date-io/date-fns)
* [`@zecos/input`](/input/overview)

You will likely also have to install `date-fns@latest` as well due to a bug.

You can install all with yarn or npm like so:

```shell
yarn add \
  @material-ui/core \
  @date-io/date-fns \
  @zecos/input \
  date-fns@latest \
  @zecos/input-picker
```

```shell
npm i -S \
  @material-ui/core \
  @date-io/date-fns \
  @zecos/input \
  date-fns@latest \
  @zecos/input-picker
```


### DatePickerInput

`DatePickerInput` is a simple date picker. Any additional props are passed to `KeyboardDatePicker`

```tsx
example:0270_mui-date-picker
```

### TimePickerInput

`TimePickerInput` is almost identical to `DatePickerInput`, only it displays a time instead of date. You have to provide the correct day if you want it. otherwise, you can just use the time with the current date.

```tsx
example:0280_mui-time-picker
```