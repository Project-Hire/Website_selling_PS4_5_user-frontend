import { CDGamDetailData } from '@src/models/cdGameDetail'
import React, { useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

interface Props {
  data: CDGamDetailData
}
export const BuyCdGameModal = ({ data }: Props) => {
  useEffect(() => {
    addPaypalScript()
  }, [])

  const handlePayment = () => {
    console.log('ok')
  }

  const addPaypalScript = () => {
    const script = document.createElement('script')

    script.src =
      'https://www.paypal.com/sdk/js?client-id=AbYBpLyA9J0xwHIP44rdOX_OUdWWF48qsMJXocJvo2PaFHd0qQzYl19fh6IvGVyNksKbN8BIoWqKtERD'

    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
  }

  console.log(data)
  return (
    <div className="buy-modal">
      <div className="buy-modal-close">x</div>
      <div>Hello</div>
      <div>
        <PayPalButton
          amount={data.price}
          onSuccess={handlePayment}
          onError={() => {
            console.log('err')
          }}
        />
      </div>
    </div>
  )
}
