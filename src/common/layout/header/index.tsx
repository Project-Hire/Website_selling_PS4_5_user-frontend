/* eslint-disable react/no-unescaped-entities */
import { MENU_HEADER } from '@src/widget/menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { ToastContainer } from 'react-toastify'

const Header = () => {
  const router = useRouter()
  const valSearch = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleBackToHome = () => {
    router.replace('/')
  }

  const handleSearch = () => {
    console.log(valSearch.current.value)
  }

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-container-title" onClick={handleBackToHome}>
          <div className="header-container-title-img">
            <img src="/images/logo_company.jpg" />
          </div>
          <span>Thai's shop</span>
          <div className="header-container-title-input">
            <input ref={valSearch} placeholder="Searching..." />
            <div onClick={handleSearch} className="header-container-title-input__search">
              <img src="/images/header/search_icon_24x24.png" />
            </div>
          </div>
        </div>
        <div className="header-container-menu">
          {MENU_HEADER.map((item) => (
            <Link href={item.path} key={item.content}>
              <a href={item.path} className="header-container-menu_item">
                <img src={item.icon} alt={item.content} />
                <span>{item.content}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  )
}

export default Header
