import { API_ADVERTISEMENT } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getAdvertisement = async () => {
  const params: any = { limit: 1000, keyword: '', page: 1 }

  const { data }: any = await getAxios(API_ADVERTISEMENT, params)

  return data
}

const useAdvertisementQuery = () => {
  return useQuery(['advertisement'], getAdvertisement, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAdvertisementQuery
