import { API_ACCESSORY } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getAccessory = async ({ queryKey }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data }: any = await getAxios(API_ACCESSORY, params)

  return data
}

const useAccessoryQuery = (params: any) => {
  return useQuery(['accessory', ...params], getAccessory, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAccessoryQuery
