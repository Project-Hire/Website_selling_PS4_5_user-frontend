import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BackIcon } from '@components/assets/BackIcon'
import { postAxios } from '@src/common/https'
import { API_REGISTER } from '@config/api'

type DataForm = {
  full_name: string
  address: string
  birth: string
  gender: string
  number_phone: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object().shape({
  full_name: yup.string().required(),
  address: yup.string().required(),
  birth: yup.string().required(),
  gender: yup.string().required(),
  number_phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const RegisterPage: NextPage = () => {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleRegister = (data: any) => {
    postAxios(API_REGISTER, data)
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

  const handleBackToLogin = () => {
    route.replace('/login')
  }

  return (
    <div className="register">
      <div className="register-bg"></div>
      <div className="register-container">
        <form className="register-container-form" onSubmit={handleSubmit(handleRegister)}>
          <div className="register-container-form-back" onClick={handleBackToLogin}>
            <BackIcon /> <span className="register-container-form-back__title">Back to login</span>
          </div>
          <div className="register-container-form-title">Register your account</div>
          <div className="register-container-form__content">
            <div className="register-container-form__content-col">
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Full name</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    placeholder="Please enter your email"
                    {...register('full_name')}
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.full_name && <span>Please enter full name</span>}
                </div>
              </div>
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Address</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    placeholder="Please enter your email"
                    {...register('address')}
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.address && <span>Please enter address</span>}
                </div>
              </div>
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Date of Birth</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    type={'date'}
                    {...register('birth')}
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.birth && <span>Please choose your date of birth</span>}
                </div>
              </div>
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Gender</div>
                <div className="register-container-form__content-col__input-text">
                  <div className="register-container-form__content-col__input-text-radio">
                    <input type={'radio'} value={'1'} {...register('gender')} />
                    <div className="label-radio">Male</div>
                  </div>
                  <div className="register-container-form__content-col__input-text-radio">
                    <input type={'radio'} value={'0'} {...register('gender')} />
                    <div className="label-radio">Female</div>
                  </div>
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.gender && <span>Please enter address</span>}
                </div>
              </div>
            </div>
            <div className="register-container-form__content-col">
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Email</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    placeholder="Please enter your email"
                    {...register('email')}
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.email && <span>Please enter email form</span>}
                </div>
              </div>
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Phone number</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    placeholder="Please enter your phone number"
                    {...register('number_phone')}
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.email && <span>Please enter email form</span>}
                </div>
              </div>
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Password</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    placeholder="Please enter your password"
                    {...register('password')}
                    type="password"
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.password && <span>Please enter the password</span>}
                </div>
              </div>
              <div className="register-container-form__content-col__input">
                <div className="register-container-form__content-col__input-label">Confirm password</div>
                <div className="register-container-form__content-col__input-text">
                  <input
                    className="register-container-form__content-col__input-text-normal"
                    placeholder="Please check your confirm password"
                    type="password"
                    {...register('confirmPassword')}
                  />
                </div>
                <div className="register-container-form__content-col__input-error">
                  {errors.confirmPassword ? 'Wrong confirm password' : ''}
                </div>
              </div>
            </div>
          </div>
          <button className="register-container-form-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
