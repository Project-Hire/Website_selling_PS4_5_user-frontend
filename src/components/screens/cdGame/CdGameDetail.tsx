import useCDGameDetailQuery from '@hooks/useCDGameDetailQuery'
import Layout from '@src/common'
import { useRouter } from 'next/router'
import React from 'react'

const CDGameDetail = () => {
  const router: any = useRouter()
  const { data: cdGame } = useCDGameDetailQuery(router.query)
  const data = cdGame?.data
  console.log(data)

  return <Layout></Layout>
}

export default CDGameDetail
