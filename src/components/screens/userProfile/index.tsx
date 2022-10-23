import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '@src/common'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { API_CHANGE_PASSWORD, API_LOGOUT, API_UPDATE_PROFILE } from '@config/api'
import { postAxios } from '@src/common/https'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { isLogin } from '@config/function'

const schemaForgotPassword = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const schemaUpdateProfile = yup.object().shape({
  full_name: yup.string().required(),
  number_phone: yup.string().required(),
  address: yup.string().required(),
  birth: yup.string().required(),
  gender: yup.string().required(),
})

interface USER_PROFILE {
  address: string | null
  birth: string | null
  confirm: number
  confirmation_code: string
  confirmation_code_expired_in: string
  created_at: string
  email: string
  email_verified_at: string | null
  full_name: string
  gender: number | null
  id: number
  number_phone: string | null
  role: number
  updated_at: string
}

export const UserProfile = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [tab, setTab] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onTouched',
    resolver: yupResolver(tab === 1 ? schemaUpdateProfile : schemaForgotPassword),
  })

  useLayoutEffect(() => {
    if (!isLogin()) {
      router.push('/login')
    }
  }, [])

  const userInfo: USER_PROFILE = useMemo(
    () => (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('@user') ?? '') : {}),
    [],
  )

  const handleChangeTab = (value: number) => {
    setTab(value)
  }

  const handleUpdateProfile = (value: any) => {
    value.user_id = userInfo?.id
    const params = value
    postAxios(API_UPDATE_PROFILE, params)
      .then((res: any) => {
        toast.success(res.message)
        queryClient.invalidateQueries(['user_profile'])
      })
      .catch(() => {})
  }

  const handleChangePassword = (value: any) => {
    value.user_id = userInfo?.id
    const params = value
    postAxios(API_CHANGE_PASSWORD, params)
      .then((res: any) => {
        localStorage.removeItem('@user')
        localStorage.removeItem('@token')
        toast.success(res.message)
        setTimeout(() => {
          router.push('login')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onLogout = () => {
    postAxios(API_LOGOUT, {})
      .then((res: any) => {
        localStorage.removeItem('@user')
        localStorage.removeItem('@token')
        toast.success(res.message)
        setTimeout(() => {
          router.push('login')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Layout>
      <div className="user-profile">
        <div className="user-profile-left">
          <div className="user-profile-left__title">Information</div>
          <img src="/images/default-user-image.png" alt="Default user image" className="w-[100%]" />
          <div className="user-profile-left__content">
            <div>ID: {userInfo?.id}</div>
            <div>Name: {userInfo?.full_name}</div>
            <div>Address: {userInfo?.address}</div>
            <div>Birth: {userInfo?.birth}</div>
            <div>Gender: {userInfo?.gender}</div>
            <div>Email: {userInfo?.email}</div>
            <div>Number Phone: {userInfo?.number_phone}</div>
          </div>
          <div className="log-out" onClick={onLogout}>
            Logout
          </div>
        </div>
        <div className="user-profile-right">
          <div className="user-profile-right__tab">
            <div
              onClick={() => handleChangeTab(1)}
              className="user-profile-right__tab-content"
              style={
                tab === 1
                  ? {
                      background: 'rgba(250, 0, 0, 0.514)',
                      color: 'white',
                    }
                  : {}
              }
            >
              Update Profile
            </div>
            <div
              onClick={() => handleChangeTab(2)}
              className="user-profile-right__tab-content"
              style={
                tab === 2
                  ? {
                      background: 'rgba(250, 0, 0, 0.514)',
                      color: 'white',
                    }
                  : {}
              }
            >
              Change Password
            </div>
          </div>
          <div>
            {tab === 1 ? (
              <form onSubmit={handleSubmit(handleUpdateProfile)} className="update-profile">
                <div>Update Profile</div>
                <div>
                  <div>Full Name:</div>
                  <input
                    placeholder="Enter full name"
                    className="b"
                    defaultValue={userInfo?.full_name}
                    {...register('full_name')}
                  />
                  <div className="text-red-400">{errors.full_name && <span>Please input the full name</span>}</div>
                </div>
                <div>
                  <div>Number Phone:</div>
                  <input
                    placeholder="Enter phone number"
                    defaultValue={userInfo?.number_phone ?? ''}
                    {...register('number_phone')}
                  />
                  <div className="text-red-400">
                    {errors.number_phone && <span>Please input the phone number</span>}
                  </div>
                </div>
                <div>
                  <div>Address:</div>
                  <input
                    placeholder="Enter phone number"
                    defaultValue={userInfo?.address ?? ''}
                    {...register('address')}
                  />
                  <div className="text-red-400">
                    {errors.number_phone && <span>Please input the phone address</span>}
                  </div>
                </div>
                <div>
                  <div>Birth:</div>
                  <input
                    placeholder="Enter full name you want to change"
                    defaultValue={userInfo?.birth ?? ''}
                    type="date"
                    {...register('birth')}
                  />
                  <div className="text-red-400">{errors.birth && <span>Please input the birth</span>}</div>
                </div>
                <div>
                  <div>Gender: </div>
                  <div className="flex gap-[5px] items-center">
                    <input type={'radio'} value="male" {...register('gender')} />
                    <div>Male</div>
                  </div>
                  <div className="flex gap-[5px] items-center">
                    <input type={'radio'} value="male" {...register('gender')} />
                    <div>Female</div>
                  </div>
                  <div className="text-red-400">{errors.gender && <span>Please input the gender</span>}</div>
                </div>
                <button type="submit" className="block m-auto w-[130px] text-white py-3 bg-blue-400 mt-[20px]">
                  Update Profile
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(handleChangePassword)} className="update-profile">
                <div className="text-center text-[22px] font-bold">Change Password</div>
                <div>
                  <div>Password: </div>
                  <input placeholder="Enter password you want to change" type={'password'} {...register('password')} />
                  <div className="text-red-400">{errors.password && <span>Please input the password</span>}</div>
                </div>
                <div>
                  <div>Confirm Password: </div>
                  <input placeholder="Enter confirm password" type={'password'} {...register('confirmPassword')} />
                  <div className="text-red-400">{errors.confirmPassword && <span>Not match to password</span>}</div>
                </div>
                <button className="block m-auto w-[130px] text-white py-3 bg-blue-400 mt-[20px]" type="submit">
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
