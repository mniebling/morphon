/**
 * Checks to see if a tokenizer string is valid. The string is invalid if there
 * are an unbalanced number of unescaped $ characters in it.
 */
export function validateTokenizer(tokenizer: string): boolean {

  const dollars = tokenizer.match(/\$/g) || []
  const escapedDollars = tokenizer.match(/\\\$/g) || []

  const unescapedDollarCount = dollars.length - escapedDollars.length

  return isEven(unescapedDollarCount)
}

export function isEven(n: number): boolean {

  return n % 2 === 0
}
