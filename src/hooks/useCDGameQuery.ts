import { API_CD_GAME } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getCDGame = async ({ queryKey }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data }: any = await getAxios(API_CD_GAME, params)

  return data
}

const useCDGameQuery = (params: any) => {
  return useQuery(['cd_game', ...params], getCDGame, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useCDGameQuery
