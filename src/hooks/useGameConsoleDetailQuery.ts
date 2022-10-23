import { API_GAME_CONSOLE_DETAIL } from '@config/api'
import { bindParams } from '@config/function'
import axios from 'axios'
import { useQuery } from 'react-query'

const getGameConsoleDetail = async (id: string) => {
  const { data } = await axios.get(bindParams(API_GAME_CONSOLE_DETAIL, { id: Number(id) }))

  return data
}

const useGameConsoleDetailQuery = (id: string) => {
  return useQuery(['game_console_detail'], () => getGameConsoleDetail(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!id,
  })
}

export default useGameConsoleDetailQuery
