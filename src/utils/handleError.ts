const handleError = error => {
  console.log('handleError says:',error)

  if (error && error.response) {
    const { data } = error.response
    const message = data && data.error && data.error.message
    if (typeof message === 'string' && message) return message
  }

  return (error && error.message) || String(error)
}

export default handleError
