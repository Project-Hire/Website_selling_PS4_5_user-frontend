import { API_ACCESSORY_DETAIL } from '@config/api'
import { bindParams } from '@config/function'
import axios from 'axios'
import { useQuery } from 'react-query'

const getCDGameDetail = async (id: string) => {
  const { data } = await axios.get(bindParams(API_ACCESSORY_DETAIL, { id: Number(id) }))

  return data
}

const useAccessoryDetailQuery = (id: string) => {
  return useQuery(['accessory'], () => getCDGameDetail(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!id,
  })
}

export default useAccessoryDetailQuery
