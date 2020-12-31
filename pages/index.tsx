import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import css from './index.module.css'


export default function Home () {

  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    window.addEventListener('drop', (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!event.dataTransfer) return

      Array.from(event.dataTransfer.files).forEach(file => {
        console.info(file)
      })

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

      <div className="test">
        <h1>Start by dropping files in this window</h1>

        { files.map((file, i) => (
          <div key={ i }>{ file.name }</div>
        ))}
      </div>
    </div>
  )
}
