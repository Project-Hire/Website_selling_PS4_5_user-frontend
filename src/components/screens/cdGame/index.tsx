import { CD_GAME } from '@config/type'
import useCDGameQuery from '@hooks/useCDGameQuery'
import Layout from '@src/common'
import { Discount } from '@src/common/Icon'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

export const CDGame = () => {
  const router = useRouter()
  const keywordRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState('')
  const [page] = useState(1)

  const { data: cdGames } = useCDGameQuery([limit, keyword, page])

  const onSeeMore = () => {
    setLimit(limit + 10)
  }

  const onSearch = () => {
    if (keywordRef?.current?.value !== '') {
      setKeyword(keywordRef?.current?.value)
    }
  }

  const handleGoToCdGameDetail = (id: number) => {
    router.push(`/cd_games/${id}`)
  }

  return (
    <Layout>
      <div className="cd-game-page">
        <div>Find your CD Game you want</div>
        <div className="cd-game-page__search">
          <input ref={keywordRef} />
          <div onClick={onSearch}>Search</div>
        </div>
        <div className="home__item-prod">
          {cdGames?.data?.map((items: CD_GAME) => (
            <div key={items.id} className="home__item-prod__item" onClick={() => handleGoToCdGameDetail(items?.id)}>
              <div className="home__item-prod_discount">
                <Discount content={items.discount} />
              </div>
              <div className="home__item-prod__item-img">
                <img src={items.image?.split(',')[0]} alt={items.name} />
              </div>
              <div className="home__item-prod-title">{items.name}</div>
              <div className="home__item-prod__price">
                <div className="home__item-prod__price-before">{items.price}$</div>
                <div className="home__item-prod__price-after">{(items.price * (100 - items.discount)) / 100}$</div>
              </div>
            </div>
          ))}
        </div>
        <div onClick={onSeeMore}>See more</div>
      </div>
    </Layout>
  )
}
