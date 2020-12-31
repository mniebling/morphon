import { ipcRenderer } from 'electron'


export function attachDropHandlers () {

  window.addEventListener('drop', (event) => {

    event.preventDefault()
    event.stopPropagation()

    Array.from(event.dataTransfer.files).forEach(file => {
      console.info(file)
    })
  })

  // If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#Specifying_Drop_Targets
  window.addEventListener('dragenter', (event) => {
    event.preventDefault()
  })

  window.addEventListener('dragover', (event) => {
    event.preventDefault()
  })
}
