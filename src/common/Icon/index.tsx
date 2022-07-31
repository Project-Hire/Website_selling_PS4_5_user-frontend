import React from 'react'

export const Discount = ({ content }: { content: number }) => {
  return <span className="discount">-{content}%</span>
}
