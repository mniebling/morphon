import css from './FileDisplay.module.css'


export interface FileDisplayProps {
  file: File,
  index: number,
  tokenizer: string,
  outputPattern: string,
}


export function FileDisplay (props: FileDisplayProps) {

  return (
    <div className={ css.fileDisplay } key={ props.index }>
      <span className={ css.index }>#{ props.index }:</span>
      <span className={ css.fileName }>{ props.file.name }</span>

      <span className={ css.arrow }>→</span>
    </div>
  )
}
