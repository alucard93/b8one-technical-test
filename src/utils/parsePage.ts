export function parsePage(value?: string | null) {
  const parsedPage = Number(value)

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1
  }

  return parsedPage
}
