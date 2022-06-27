import { isLogin } from '@config/function'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Header from '../header'

const AuthLayout = ({ children }: any) => {
  const route = useRouter()

  useEffect(() => {
    if (isLogin()) {
      route.replace('/')
    }
  }, [])

  return (
    <div className="auth">
      <Header />
      <div className="auth-bg"></div>
      <div className="auth-container">{children}</div>
    </div>
  )
}

export default AuthLayout
