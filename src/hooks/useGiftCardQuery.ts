import { API_GIFT_CARD } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getGiftCard = async ({ queryKey }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data }: any = await getAxios(API_GIFT_CARD, params)

  return data
}

const useGiftCardQuery = (params: any) => {
  return useQuery(['cd_game', ...params], getGiftCard, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useGiftCardQuery
