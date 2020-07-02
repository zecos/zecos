import * as React from "react"

export const camelToTitle = camelCase => camelCase
  .replace(/([A-Z])/g, match => ` ${match}`)
  .replace(/([0-9]+)/g, match => ` ${match}`)
  .replace(/^./g, match => match.toUpperCase())
  .trim()

export const titleToKebab = title => title
  .replace(/ ([A-Z])/g, match => `-${match.trim()}`)
  .toLowerCase()
  
export const kebabToSnake = (kebab: string) => kebab.replace("-", "_")

export const camelToUpperCamel = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

export const hasItemErrors = (items) => {
  const itemErrors = getErrors(items)
  for (const name in itemErrors) {
    if (itemErrors[name].length > 0) {
      return true
    }
  }
  return false
}

export const getValues = function (items: any[], names: string | string[], ...more: string[]) {
  if (Array.isArray(names) || more.length > 0) return byNames(items, more.concat(names))
  else if (typeof names === "string") {
    return byName(items, names)
  } else if (arguments.length === 0) {
    return getAllValues(items)
  }
}


export const getErrors = (items: any[]): any => {
  const result = {}
  for (const item of items) {
    if (getItemType(item) === "input") {
      result[item.name] = item.actions.getState().errors
    }
  }
  return result
}

const byName = (items: any[], name: string): any => {
  for (const item of items) {
    if (getItemType(item) === "input" && name === item.name) {
      return item.actions.getState().value
    }
  }
}

const byNames = (items: any[], names: string[]): any => {
  const result = {}
  for (const item of items) {
    for (const name of names)
      if (getItemType(item) === "input" && name === item.name) {
        result[name] = item.actions.getState().value
      }
  }
  return result
}

const getAllValues = (items: any[]) => {
  const result = {}
  for (const item of items) {
      if (getItemType(item) === "input" && name === item.name) {
        result[item.name] = item.actions.getState().value
      }
  }
  return result
}

const getItemType = (item) => {
  if (typeof item === "object" && typeof item.meta === "object") {
    return item.meta.$$__input_type
  } else {
    return ""
  }
}



// TODO: export this stuff

// const getDisplayType = (item) => {
//   if (typeof item === "object" && typeof item.meta === "object") {
//     return item.meta.$$__input_type
//   } else {
//     return ""
//   }
// }


// const displayLayout = ({items, name}, opts, level) => {
//   return (
//     <div style={{marginLeft: level * 10}}>
//       <b style={{textAlign: "left", margin: "5px auto"}}>{name}</b><br />
//       {items.map((item, i) => <div key={i}>{displayFormData(item, opts, level + 1)}</div>)}
//     </div>
//   )
// }

// const renderDisplayErrors = (errs, level) => {
//   return (
//     <div>
//       {errs.map((err, i) => (
//         <div style={{marginLeft: level * 10}} key={i}>
//           {err.toString()}
//         </div>
//       ))}
//     </div>
//   )
// }

// const displayInput = ({state, name}, opts, level) => {
//   if (opts.full) {
//     return (
//       <div style={{marginLeft: level * 10}}>
//       <b style={{textAlign: "left", margin: "5px auto"}}>{name}</b><br />
//         value: {state.value}<br />
//         errors: {renderDisplayErrors(state.errors, level + 1)}
//         pristine: {"" + state.pristine}<br />
//         touched: {"" + state.touched}<br />
//       </div>
//     )
//   }
//   const stringVal = typeof state.value === "string" ? state.value :
//     typeof state.value.toString === "function" ? state.value.toString() :
//       JSON.stringify(state.value)
//   return (
//     <div style={{marginLeft: level * 10}}>
//       {name}: {stringVal}
//     </div>
//   )
// }

// const displayMulti = ({items, name}, opts, level) => {
//   return (
//     <div style={{marginLeft: level * 10}}>
//       <b style={{textAlign: "left", margin: "5px auto"}}>{name}</b><br />
//       {items.map((item, i) => <div key={i}>{displayFormData(item, opts, level + 1)}</div>)}
//     </div>
//   )
    
  
// }
// export const displayFormData:any = (item, opts = {className: ""}, level=0) => {
//   const type = getDisplayType(item)
//   let result;
//   switch(type) {
//     case "layout":
//       result = displayLayout(item, opts, level)
//       break
//     case "input":
//       result = displayInput(item, opts, level)
//       break
//     case "multi":
//       result = displayMulti(item, opts, level)
//       break
//   }
//   if (!result) {
//     return <div>Input Not Recognized</div>
//   }
//   return <div className={opts.className}>{result}</div>
// }

// const logLayout = ({items, name}, opts, level) => {
//   return (
//       "  ".repeat(level) + name + "\n" +
//       items
//         .map((item, i) => getFormData(item, opts, level + 1))
//         .join("\n")
//         + "\n"
//   )
// }

// const logErrors = (errs, level) => {
//   return (
//       errs
//         .map((err, i) => "  ".repeat(level) + err.toString())
//         .join("\n")
//   )
// }

// const logInput = ({state, name}, opts, level) => {
//   if (opts.full) {
//     return (
//         [
//           name ,
//           `value: ${state.value}`,
//           `errors: \n${logErrors(state.errors, level + 1)}`,
//           `pristine: ${"" + state.pristine}`,
//           `touched: ${"" + state.touched}`
//         ].map(str => "  ".repeat(level) + str + "\n").join("")
//     )
//   }
//   return "  ".repeat(level) + `${name}: ${state.value}`
// }

// const logMulti = ({items, name}, opts, level) => {
//   console.log("multi items", items)
//   return "  ".repeat(level) + name + "\n" +
//     items.map(item => getFormData(item, opts, level + 1)).join("\n") + "\n"
// }
// export const getFormData:any = (item, opts = {}, level=0) => {
//   const type = getDisplayType(item)
//   let result;
//   switch(type) {
//     case "layout":
//       result = logLayout(item, opts, level)
//       break
//     case "input":
//       result = logInput(item, opts, level)
//       break
//     case "multi":
//       result = logMulti(item, opts, level)
//       break
//   }
//   return result
// }

// const logFormData = (items, opts) => {
//   const result = getFormData(items, opts)
//   if (!result) {
//     console.log("Input not recognized")
//   }
//   console.log(result)
// }