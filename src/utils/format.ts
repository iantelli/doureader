export const formatTitle = (str: string, split: number) => {
  if (str.length <= split) return str
  return str.slice(0, split) + "..."
}
