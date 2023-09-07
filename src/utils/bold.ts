import parse from 'html-react-parser'

export const boldText = (input: string, keyword: string) =>
  parse(input.replaceAll(keyword, `<mark>${keyword}</mark>`))
