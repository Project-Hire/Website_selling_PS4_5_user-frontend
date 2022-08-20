import { API_ACCESSORY } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getAccessory = async () => {
  const params: any = { limit: 1000, keyword: '', page: 1 }

  const { data }: any = await getAxios(API_ACCESSORY, params)

  return data
}

const useAccessoryQuery = () => {
  return useQuery(['accessory'], getAccessory, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAccessoryQuery
