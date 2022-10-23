import { API_GET_PAYMENT_CD_GAME_HISTORY } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getPaymentCDGame = async ({ queryKey }: any) => {
  // eslint-disable-next-line no-unused-vars, camelcase
  const [_, limit, user_id, page] = queryKey

  // eslint-disable-next-line camelcase
  const params = { limit, user_id, page }

  const { data }: any = await getAxios(API_GET_PAYMENT_CD_GAME_HISTORY, params)

  return data
}

const usePaymentCDGameQuery = (params: any) => {
  return useQuery(['payment_cd_game', ...params], getPaymentCDGame, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default usePaymentCDGameQuery
