import { Token } from './tokenize'

export const tokenColors = ['#8dd3c7','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#ffffb3']
export const defaultTokenColor = '#f5f5f5'

export type ColorizedToken = Token & { color: string }

/**
 * If a single `tokens` array is passed, returns a colorized array of tokens
 * according to the main color list.
 *
 * If a reference `tokens` array is passed, returns a colorized array of tokens
 * by finding the matching token by name in `referenceTokens` and using that color.
 */
export function colorizeTokens(tokens: Token[], referenceTokens?: ColorizedToken[]): ColorizedToken[] {

  const captureTokens = tokens.filter(t => t.type === 'capture')

  return tokens.reduce<ColorizedToken[]>((accum, token) => {

    if (token.type === 'capture' && !!referenceTokens) {
      const matchingToken = referenceTokens.find(t => t.name === token.name)
      accum.push({ ...token, color: matchingToken ? matchingToken.color : defaultTokenColor })
      return accum
    }

    if (token.type === 'capture') {
      const i = captureTokens.findIndex(t => t.name === token.name)
      accum.push({ ...token, color: tokenColors[i] })
      return accum
    }

    accum.push({ ...token, color: defaultTokenColor })
    return accum
  }, [])
}
