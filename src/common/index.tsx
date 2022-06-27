import React from 'react'
import Header from './layout/header'

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-container">{children}</div>
    </div>
  )
}

export default Layout
