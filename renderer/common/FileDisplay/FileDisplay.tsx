import classNames from 'classnames'
import { ColorizedToken } from '../colorize-tokens'
import css from './FileDisplay.module.css'

export interface FileDisplayProps {
  index: number,
  tokens: ColorizedToken[],
}

export function FileDisplay (props: FileDisplayProps) {

  return (
    <div className={ css.fileDisplay } key={ props.index }>

      { props.tokens.map((token, i) => (
        <span
          className={ classNames(css.token) }
          key={ i }
          style={{
            backgroundColor: token.color,
            padding: token.type === 'capture'
              ? '2px 4px'
              : '0',
          }}
        >{ token.text }</span>
      )) }

    </div>
  )
}
