import React from 'react'

interface Props {
  amount: number
  max: number
  min: number
  handleDecreaseAmount: () => void
  handleIncreaseAmount: () => void
}

const QuantityButton = ({ amount, max, min, handleDecreaseAmount, handleIncreaseAmount }: Props) => {
  return (
    <div className="quantity-button">
      <button className="quantity-button-btn" disabled={amount > min ? false : true} onClick={handleDecreaseAmount}>
        -
      </button>
      <div className="quantity-button-amount">{amount}</div>
      <button className="quantity-button-btn" disabled={amount < max ? false : true} onClick={handleIncreaseAmount}>
        +
      </button>
    </div>
  )
}

export default QuantityButton
