import { API_RE_REGISTER, API_VERIFY_OTP } from '@config/api'
import { isVerify } from '@config/function'
import { postAxios } from '@src/common/https'
import moment from 'moment'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const VerifyPage: NextPage = () => {
  const route = useRouter()
  const valVerify = useRef() as React.MutableRefObject<HTMLInputElement>
  const [second, setSecond] = useState(0)
  const [error, setError] = useState(false)
  const [checkResend, setCheckResend] = useState(false)
  const [data, setData] = useState({ user_id: null, OTP_token: null, email: '' })

  useEffect(() => {
    if (!checkResend) {
      if (!isVerify()) {
        route.replace('login')
      } else {
        const verify = JSON.parse(localStorage.getItem('@verify') || '')
        setData({ user_id: verify.userId, OTP_token: verify.verifyOTP, email: verify.email })
        if (moment(verify.expired_in).unix() - moment().unix() > 0) {
          const myInterval = setInterval(() => {
            if (moment(verify.expired_in).unix() - moment().unix() === 0) {
              clearInterval(myInterval)
              setCheckResend(true)
            }
            setSecond(moment(verify.expired_in).unix() - moment().unix())
          }, 1000)
          return () => {
            clearInterval(myInterval)
          }
        }
      }
    }
  }, [checkResend])

  const handleVerifyOTP = () => {
    if (valVerify.current.value != data.OTP_token) {
      setError(true)
    } else {
      postAxios(API_VERIFY_OTP, { user_id: data.user_id, OTP_token: valVerify.current.value })
        .then((res: any) => {
          route.replace('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleResend = () => {
    postAxios(API_RE_REGISTER, { email: data.email })
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
        setCheckResend(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="verify">
      <div className="verify-bg"></div>
      <div className="verify-container">
        <div className="verify-container-title">Verify OTP code</div>
        <div className="verify-container-content">
          <input className="verify-container-content__input" ref={valVerify} />
          {checkResend ? (
            <div className="verify-container-content-resend" onClick={handleResend}>
              Resend code
            </div>
          ) : (
            <>
              {second !== 0 && (
                <div className="verify-container-content-time">
                  You have <span className="verify-container-content-time__check">{second}</span>s left to verify
                </div>
              )}
              <div className="verify-container-content-error">{error && 'Your OTP is not true'}</div>
            </>
          )}
        </div>
        <button className="verify-container-btn" onClick={handleVerifyOTP}>
          Verify
        </button>
      </div>
    </div>
  )
}

export default VerifyPage
