import React, { useEffect, useRef } from 'react'
import { examples } from '../examples/index'
import styles from './CodeBlock.module.css'
import './CodeBlock.css'
import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prism-themes/themes/prism-darcula.css'
import './nord.css'
import './Fira/fira_code.css'
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

declare var Prism: any

const HL = ({language, children}) => {
  const codeEl = useRef(null)
  useEffect(() => {
    if (codeEl) {
      Prism.highlightElement(codeEl.current)
    }
  }, [codeEl, language, children])
  return (
    <div className="code-block">
      <pre ref={codeEl} className={`language-${language} example`}>
        {children}
      </pre>
    </div>
  )
}

const startTag = "example:"
export const CodeBlock = ({language, value}) => {
  if (value.startsWith(startTag)) {
    const id = value.substr(startTag.length)
    value = examples[id].content
    const Cmpt = examples[id].cmpt.default
    
    return (
      <>
      <h3 className={styles.resultHeading}>Result</h3>
      <div className={styles.result}>
        <Cmpt />
      </div>
      <h3 className={styles.resultHeading}>Code</h3>
      <HL language={language}>
        {value}
      </HL>
      </>
    )
  }
  return (
    <HL language={language}>
      {value}
    </HL>
  )
}

