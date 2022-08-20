import { API_GAME_CONSOLE } from '@config/api'
import { getAxios } from '@src/common/https'
import { useQuery } from 'react-query'

const getGameConsole = async ({ queryKey }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data }: any = await getAxios(API_GAME_CONSOLE, params)

  return data
}

const useGameConsoleQuery = (params: any) => {
  return useQuery(['game_console', ...params], getGameConsole, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useGameConsoleQuery
