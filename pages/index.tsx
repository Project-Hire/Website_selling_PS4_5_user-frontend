import React from 'react'
import type { NextPage } from 'next'
import moment from 'moment'
import Home from '@components/screens/home'

const HomePage: NextPage = () => {
  console.log(moment('2022-06-05T12:55:03.608634Z'))
  return <Home />
}

export default HomePage
