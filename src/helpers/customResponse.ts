
export const customResponse = (status: Number | 500, result: object | '', error: boolean | false , message: string | '') => {
  const response = {
    status,
    result,
    error,
    message
  }

  return response
}
