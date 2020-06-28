export type FieldInput = {
  [key: string]: IFieldInputObject
}

export interface IFieldInputObject {
  validate?: (arg: any) => Error[]
  init?: any
}

export interface IFieldState {
  [key: string]: IFieldSingleState
}

export interface IFieldSingleState {
    errors: Error[],
    touched: boolean,
    pristine: boolean,
    value: any,
}

export interface IFieldActions {
  setValue: (key: string, newVal) => IFieldState
  setValues: (newVals) => IFieldState
  resetField: (key: string) => IFieldState
  resetFields: () => IFieldState
  setTouched: (key: string) => IFieldState
  getState: () => IFieldState
  setState: (IFieldState) => IFieldState
}

export interface IFieldSingleActions {
  setValue: (newVal) => IFieldSingleState
  reset: () => IFieldSingleState
  setTouched: () => IFieldSingleState
  getState: () => IFieldSingleState
  setState: (state: IFieldSingleState) => IFieldSingleState
  refreshErrors: () => IFieldSingleState
}