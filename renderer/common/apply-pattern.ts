import { Token, tokenize } from './tokenize'


export function applyPattern(outputPattern: string, tokens: Token[]) {

  let output = outputPattern

  tokens.forEach(token => {
    output = output.replace(`$${token.name}$`, token.text)
  })

  return tokenize(output, outputPattern)
}
