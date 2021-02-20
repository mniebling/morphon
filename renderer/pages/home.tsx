import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { applyPattern } from '../common/apply-pattern'
import { FileDisplay } from '../common/FileDisplay'
import { tokenize } from '../common/tokenize'
import css from './home.module.css'


export default function Home () {

  const [files, setFiles] = useState<File[]>([])
  const [tokenizer, setTokenizer] = useState<string>('$name$.$ext$')
  const [outputPattern, setOutputPattern] = useState<string>('$name$ (new).$ext$')

  useEffect(() => {
    window.addEventListener('drop', (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!event.dataTransfer) return

      setFiles(Array.from(event.dataTransfer.files))
    })

    // If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#Specifying_Drop_Targets
    window.addEventListener('dragenter', (event) => event.preventDefault())
    window.addEventListener('dragover', (event) => event.preventDefault())
  })

  return (
    <div className={ css.container }>
      <Head>
        <title>Morphon</title>
      </Head>

      { files.length === 0
        ? <div className={ css.blankSlate }>
            <h1>Start by dropping files in this window</h1>
          </div>
        : null
      }

      { files.length > 0
        ? <div><h2>{ files.length } files selected</h2></div>
        : null
      }

      { files.length > 0
        ? <div className={ css.form }>
            <div className={ css.formGroup }>
              <label>Tokens from filename: </label>
              <input
                className={ css.formInput }
                onChange={ (e) => setTokenizer(e.target.value) }
                type="text"
                value={ tokenizer }
              />
            </div>
            <div className={ css.formGroup }>
              <label>Output filename pattern: </label>
              <input
                className={ css.formInput }
                onChange={ (e) => setOutputPattern(e.target.value) }
                type="text"
                value={ outputPattern }
              />
            </div>
          </div>
        : null
      }

      { files.length > 0
        ? <div className={ css.filesList }>
            <table>
              <thead></thead>
              <tbody>
              { files.map((file, i) => (
                <tr key={ i }>
                  <td>
                    <FileDisplay index={ i } tokens={ tokenize(file.name, tokenizer) } />
                  </td>
                  <td>
                    <span className={ css.arrow }>→</span>
                  </td>
                  <td>
                    <FileDisplay index={ i } tokens={ applyPattern(outputPattern, tokenize(file.name, tokenizer)) } />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        : null
      }

    </div>
  )
}
