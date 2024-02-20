export type Context = {
  request: {
    contentType: string
    headers: Headers
  }
  params: {
    query: string
    operationName: string
    extensions: object
  }
}
