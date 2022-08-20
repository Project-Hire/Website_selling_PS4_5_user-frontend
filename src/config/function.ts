export const isLogin = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('@user') && !!localStorage.getItem('@token')
  }
}

export const isVerify = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('@verify')
  }
}

export const bindParams = (url: string, params: { id: number }) => {
  const { id }: { id: number } = params
  const string = url.replace(':id', String(id))

  return string
}
