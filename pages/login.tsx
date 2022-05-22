import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BackIcon } from '@components/assets/BackIcon'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { postAxios } from '@src/common/https'
import { API_LOGIN } from '@config/api'
import { isLogin } from '@config/function'

type DataForm = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const LoginPage: NextPage = () => {
  const route = useRouter()
  const [check, setCheck] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isLogin()) {
      route.replace('/')
    }
  }, [check])

  const handleLogin = (data: any) => {
    postAxios(API_LOGIN, data)
      .then((res: any) => {
        setCheck(!check)
        localStorage.setItem('@user', JSON.stringify(res.user))
        localStorage.setItem('@token', JSON.stringify(res.access_token))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleBackToHome = () => {
    route.push('/')
  }

  return (
    <div className="login">
      <div className="login-bg"></div>
      <div className="login-container">
        <form className="login-container-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="login-container-form-back" onClick={handleBackToHome}>
            <BackIcon /> <span className="login-container-form-back__title">Back to Home</span>
          </div>
          <div className="login-container-form-title">Welcome to Thais shop</div>
          <div className="login-container-form__input">
            <div className="login-container-form__input-label">Email</div>
            <div className="login-container-form__input-text">
              <input placeholder="Please enter your email" {...register('email')} />
            </div>
            <div className="login-container-form__input-error">
              {errors.email && <span>Please enter email form</span>}
            </div>
          </div>
          <div className="login-container-form__input">
            <div className="login-container-form__input-label">Password</div>
            <div className="login-container-form__input-text">
              <input placeholder="Please enter your password" {...register('password')} type="password" />
            </div>
            <div className="login-container-form__input-text">
              {errors.password && <span>Please enter the password</span>}
            </div>
          </div>
          <Link href="/register">
            <a className="login-container-form__link">Dont have account ?</a>
          </Link>
          <button className="login-container-form-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
