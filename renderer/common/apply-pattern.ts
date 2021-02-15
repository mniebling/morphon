import { Token } from './tokenize'


export function applyPattern(text: string, outputPattern: string, tokens: Token[]) {

  let output = outputPattern

  // For each capture token, find and replace $name$ with the token text
  tokens
    .filter(t => t.type === 'capture')
    .forEach((token) => {
      output = output.replace(`$${token.name}$`, token.text)
    })

  return output
}
