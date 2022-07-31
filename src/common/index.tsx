import React from 'react'
import Banner from './layout/banner'
import Header from './layout/header'

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Header />
      <Banner />
      <div className="layout-container">{children}</div>
    </div>
  )
}

export default Layout
