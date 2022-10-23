import { toast } from 'react-toastify'
import { PayPalButton } from 'react-paypal-button-v2'
import { API_GET_VOUCHER, API_PAYMENT_CD_GAME } from '@config/api'
import { VoucherCodeResponse } from '@config/type'
import { postAxios } from '@src/common/https'
import { UserData } from '@src/models'
import { CDGamDetailData } from '@src/models/cdGameDetail'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'

interface Props {
  amount: number
  data: CDGamDetailData
  handleCloseModal: () => void
}
export const BuyCdGameModal = ({ amount, data, handleCloseModal }: Props) => {
  const [userData, setUserData] = useState<UserData>()
  const [voucherCode, setVoucherCode] = useState<string>('')
  const [discountVoucher, setDiscountVoucher] = useState<number>(0)

  useEffect(() => {
    addPaypalScript()
  }, [])

  const userInfo = useMemo(() => (typeof window !== 'undefined' ? window.localStorage.getItem('@user') : null), [])

  useEffect(() => {
    if (userInfo !== null) {
      setUserData(JSON.parse(userInfo))
    }
  }, [userInfo])

  const handlePayment = () => {
    const params = {
      cd_games_id: data?.id,
      quantity: 1,
      user_id: userData?.id,
      email: userData?.email,
      money: data.discount > 0 ? ((data.price * (100 - data.discount)) / 100) * amount : data.price * amount,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    postAxios(API_PAYMENT_CD_GAME, params)
      .then((res: any) => {
        if (res.status === 1) {
          toast.success(res?.message)
        } else {
          toast.error(res?.message)
        }
      })
      .catch((err: any) => {
        toast.error(err?.message)
      })
  }

  const handleChangeVoucherCode = (e: { target: { value: string } }) => {
    setVoucherCode(e.target.value)
  }

  const handleCheckVoucher = () => {
    const params = {
      voucher: voucherCode,
    }

    postAxios(API_GET_VOUCHER, params)
      .then((res: any) => {
        const { status, data, message }: VoucherCodeResponse = res

        if (status === 1 && data.length > 0) {
          setDiscountVoucher(data[0].discount)
          toast.success(message)
        } else {
          toast.error('Your voucher is not valid!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addPaypalScript = () => {
    const script = document.createElement('script')

    script.src =
      'https://www.paypal.com/sdk/js?client-id=AbYBpLyA9J0xwHIP44rdOX_OUdWWF48qsMJXocJvo2PaFHd0qQzYl19fh6IvGVyNksKbN8BIoWqKtERD'

    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
  }

  return (
    <div className="buy-modal">
      <div className="buy-modal-close" onClick={handleCloseModal}>
        x
      </div>
      <div className="buy-modal-header">San pham ban muon mua</div>
      <div className="buy-modal-content">
        <div className="buy-modal-content__left">
          <img src={data?.image?.split(',')[0]} className="buy-modal-img" />
        </div>
        <div className="buy-modal-content__right">
          <div className="buy-modal-content__right-name">{data?.name}</div>
          {discountVoucher > 0 ? (
            <div className="buy-modal-voucher">
              Price:
              <span className="buy-modal-voucher__current">
                {data.discount > 0 ? ((data.price * (100 - data.discount)) / 100) * amount : data.price * amount}
              </span>
              <span>={'>'}</span>
              <span className="buy-modal-voucher__new">
                {(data.discount > 0 ? ((data.price * (100 - data.discount)) / 100) * amount : data.price * amount) -
                  discountVoucher}
              </span>
            </div>
          ) : (
            <div className="buy-modal-not-voucher">
              Price: {data.discount > 0 ? ((data.price * (100 - data.discount)) / 100) * amount : data.price * amount}
            </div>
          )}
          <div className="buy-modal-quantity">Quantity: {amount}</div>
          <div className="buy-modal__voucher-text">Voucher:</div>
          <div className="buy-modal__voucher-input">
            <input placeholder="Enter your voucher" onChange={handleChangeVoucherCode} />
            <button disabled={voucherCode === '' ? true : false} onClick={handleCheckVoucher}>
              Get voucher
            </button>
          </div>
        </div>
      </div>
      <div className="buy-modal-button">
        <div className="buy-modal-button__text">Please pay for the product by Paypal</div>
        <PayPalButton
          amount={
            discountVoucher > 0
              ? (data.discount > 0 ? ((data.price * (100 - data.discount)) / 100) * amount : data.price * amount) -
                discountVoucher
              : data.discount > 0
              ? ((data.price * (100 - data.discount)) / 100) * amount
              : data.price * amount
          }
          onSuccess={handlePayment}
          onError={() => {
            console.log('err')
          }}
        />
      </div>
    </div>
  )
}
