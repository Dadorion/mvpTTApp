export function required(value) {
  if (value) return undefined
  return 'Field is required'
}

export function maxLengthCreator(maxLength) {
  return (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
  }
}
export function minLengthCreator(minLength) {
  return (value) => {
    if (value && value.length < minLength) return `Min length is ${minLength} symbols`
    return undefined
  }
}
