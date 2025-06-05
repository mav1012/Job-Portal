function excludeFields<T>(obj: T, fields: (keyof T)[]): Partial<T> {
  const clone = { ...obj }
  for (const field of fields) {
    delete clone[field]
  }
  return clone
}

export { excludeFields }
