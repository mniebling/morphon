import classNames from 'classnames'
import { Token } from '../tokenize'
import css from './FileDisplay.module.css'


export interface FileDisplayProps {
  index: number,
  tokens: Token[],
}

export const tokenColors = ['#8dd3c7','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#ffffb3']


export function FileDisplay (props: FileDisplayProps) {

  return (
    <div className={ css.fileDisplay } key={ props.index }>

      { props.tokens.map((token, i) => (
        <span
          className={ classNames(css.token) }
          key={ i }
          style={{
            backgroundColor: token.type === 'capture'
              ? getTokenColor(i)
              : '#f5f5f5',
            padding: token.type === 'capture'
              ? '2px 4px'
              : '0',
          }}
        >{ token.text }</span>
      )) }

    </div>
  )

  function getTokenColor(i: number) {

    // Find the token in question
    const target = props.tokens.find((token, j) => i === j).name

    // Now filter out text tokens, then return the target token's index in the filtered list
    const index = props.tokens
      .filter(t => t.type === 'capture')
      .findIndex(t => t.name === target)

    return tokenColors[index]
  }
}
