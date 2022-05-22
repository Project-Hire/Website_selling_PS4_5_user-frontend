export const isLogin = () => {
  return !!localStorage.getItem('@user') && !!localStorage.getItem('@token')
}

export const isVerify = () => {
  return !!localStorage.getItem('@verify')
}
