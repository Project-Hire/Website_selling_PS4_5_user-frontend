import usePaymentCDGameQuery from '@hooks/usePaymentCDGameQuery'
import Layout from '@src/common'
import React, { useMemo } from 'react'

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

export const Payment = () => {
  const limit = 1000
  const page = 1

  const userInfo: USER_PROFILE = useMemo(
    () => (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('@user') ?? '') : {}),
    [],
  )

  const { data: paymentHistory } = usePaymentCDGameQuery([limit, userInfo?.id, page])

  const data = paymentHistory?.data

  return (
    <Layout>
      <div className="container">
        <h2>Payment History</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-1">Money</div>
            <div className="col col-1">Money After Discount</div>
            <div className="col col-1">Quantity</div>
            <div className="col col-3">Customer</div>
            <div className="col col-3">Email</div>
            <div className="col col-3">Created At</div>
          </li>
          {data?.map((item: any) => {
            return (
              <li className="table-row" key={item?.id}>
                <div className="col col-1" data-label="Name">
                  {item?.cd_game?.name}
                </div>
                <div className="col col-1" data-label="Money">
                  {item?.cd_game?.price}$
                </div>
                <div className="col col-1" data-label="Money After Discount">
                  {item?.money}$
                </div>
                <div className="col col-1" data-label="Quantity">
                  {item?.quantity}
                </div>
                <div className="col col-3" data-label="Customer">
                  {item?.user?.full_name}
                </div>
                <div className="col col-3" data-label="Email">
                  {item?.email}
                </div>
                <div className="col col-3" data-label="Created At">
                  {item?.created_at}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}
