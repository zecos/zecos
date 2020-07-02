### @zecos/util

Utility functions

### `getValues`

Gets values 1 level deep of an array of [`input`s](/input/create-input).

The first argument is an array of inputs, and the second is the name or names of of the values you want to get.

As demonstrated, you can get either a single or multiple values. A single value is returned as a string, and multiple values are returned as a key-value map object.

```tsx
example:0290_get-values
```

`(items: any[], names: string | string[], ...more: string[]) => string or object of values`