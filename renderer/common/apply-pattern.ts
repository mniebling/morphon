import { ColorizedToken, colorizeTokens } from './colorize-tokens'
import { tokenize } from './tokenize'


export function applyPattern(outputPattern: string, tokens: ColorizedToken[]) {

  let output = outputPattern

  tokens.forEach(token => {
    output = output.replace(`$${token.name}$`, token.text || '')
  })

  return colorizeTokens(tokenize(output, outputPattern), tokens)
}
