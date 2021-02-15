import { useEffect, useState } from 'react'
import { applyPattern } from '../apply-pattern'
import { Token, tokenize } from '../tokenize'
import css from './FileDisplay.module.css'


export interface FileDisplayProps {
  file: File,
  index: number,
  tokenizer: string,
  outputPattern: string,
}


export function FileDisplay (props: FileDisplayProps) {

  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    const t = tokenize(props.file.name, props.tokenizer)
    setTokens(t)
    console.info(`tokens for ${props.file.name}:`, t)
  }, [props.file, props.tokenizer])

  return (
    <div className={ css.fileDisplay } key={ props.index }>
      <span className={ css.index }>#{ props.index }:</span>
      <span className={ css.fileName }>{ props.file.name }</span>

      <span className={ css.arrow }>→</span>

      <span className={ css.outputFileName }>{ applyPattern(props.file.name, props.outputPattern, tokens) }</span>
    </div>
  )
}
