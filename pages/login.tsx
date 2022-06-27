import React from 'react'
import { toast } from 'react-toastify'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BackIcon } from '@components/assets/BackIcon'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { postAxios } from '@src/common/https'
import { API_LOGIN, API_RE_REGISTER } from '@config/api'
import { ERR_BAD_REQUEST, ERR_NETWORK } from '@config/path'
import AuthLayout from '@src/common/layout/auth'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleResend = (email: string) => {
    postAxios(API_RE_REGISTER, { email: email })
      .then((res: any) => {
        localStorage.setItem(
          '@verify',
          JSON.stringify({
            userId: res.user.id,
            verifyOTP: res.user.confirmation_code,
            expired_in: res.user.confirmation_code_expired_in,
            email: res.user.email,
          }),
        )
        route.replace('/verify')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLogin = (data: any) => {
    postAxios(API_LOGIN, data)
      .then((res: any) => {
        console.log(res)
        if (res.user.confirm === 0) {
          handleResend(res.user.email)
        } else {
          localStorage.setItem('@user', JSON.stringify(res.user))
          localStorage.setItem('@token', JSON.stringify(res.access_token))
          localStorage.setItem('@expire', JSON.stringify(res.expires_in))
          route.replace('/')
        }
      })
      .catch(({ code, response, message }) => {
        if (code === ERR_BAD_REQUEST) {
          if (response.status === 400) {
            toast.error(response.data.message)
          } else if (response.status === 401) {
            toast.error('Please register this email')
          } else {
            toast.error('Wrong email or password')
          }
        } else if (code === ERR_NETWORK) {
          toast.error(message)
        }
      })
  }

  const handleBackToHome = () => {
    route.push('/')
  }

  return (
    <AuthLayout>
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
    </AuthLayout>
  )
}

export default LoginPage
