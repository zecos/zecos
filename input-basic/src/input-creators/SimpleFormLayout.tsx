// import styles from './SimpleFormLayout.css'
// import * as React from 'react'
// import { createLayout } from "@zecos/input"

// const renderError = (error, i) => <div className={styles.red} key={i}>{error}</div>

// const renderErrors = (err) => {
//   if (Array.isArray(err)) {
//     return <>{err.map(renderError)}</>
//   } else {
//     return renderError(err, null)
//   }
// }

// export const SimpleFormLayout = createLayout(({props, items, helpers, errors}) => {
//   const [serverErrors, setServerErrors] = React.useState([] as any[])
//   const [attemptedWithErrors, setAttemptedWithErrors] = React.useState(false)
//   return (
//     <form>
//       <h3 className={styles.heading}>{helpers.title}</h3>
//       {(errors.length) ? renderErrors(opts.errors) : ""}
//       {serverErrors.length ? renderErrors(serverErrors) : ""}
//       {attemptedWithErrors ? <div className={styles.red}>Please fix errors to continue.</div> : ""}
//       {items.map((Input, i) => (
//         <span key={i}><Input.Cmpt key={i} /></span>
//       ))}
//       <div>
//         <Button {...finalButtonProps}>Submit</Button>
//       </div>
//     </form>
//   )
// })

