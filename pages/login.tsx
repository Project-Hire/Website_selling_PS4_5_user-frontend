import React from 'react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type DataForm = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  // confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-container-form" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="login-container-form-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
