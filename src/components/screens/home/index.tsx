import React from 'react'
import useCDGameQuery from '@hooks/useCDGameQuery'
import Layout from '@src/common'
import { CD_GAME } from '@config/type'
import { Discount } from '@src/common/Icon'
import { useRouter } from 'next/router'

const Home = () => {
  const limit = 5
  const keyword = ''
  const page = 1
  const router = useRouter()

  const { data: cdGames } = useCDGameQuery([limit, keyword, page])

  const handleGoToCdGameDetail = (id: number) => {
    router.push(`cd_games/${id}`)
  }

  const handleGoToGameConsoleDetail = (id: number) => {}

  const handleGoToAccessoryDetail = (id: number) => {}

  const handleGoToGiftCard = (id: number) => {}

  return (
    <Layout>
      <div className="home">
        <div className="home__item">
          <div className="home__item-content">
            <div className="home__item-content-title">CD-game</div>
            <div className="home__item-content-more">All Product</div>
          </div>
          <div className="home__item-prod">
            {cdGames?.data?.map((items: CD_GAME) => (
              <div key={items.id} className="home__item-prod__item" onClick={() => handleGoToCdGameDetail(items?.id)}>
                <div className="home__item-prod_discount">
                  <Discount content={items.discount} />
                </div>
                <div className="home__item-prod__item-img">
                  <img src={items.image} alt={items.name} />
                </div>
                <div className="home__item-prod-title">{items.name}</div>
                <div className="home__item-prod__price">
                  <div className="home__item-prod__price-before">{items.price}đ</div>
                  <div className="home__item-prod__price-after">{(items.price * (100 - items.discount)) / 100}đ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="home__item">
          <div className="home__item-content">
            <div className="home__item-content-title">Game Console</div>
            <div className="home__item-content-more">All Product</div>
          </div>
          <div className="home__item-prod">
            {cdGames?.data?.map((items: CD_GAME) => (
              <div
                key={items.id}
                className="home__item-prod__item"
                onClick={() => handleGoToGameConsoleDetail(items?.id)}
              >
                <div className="home__item-prod_discount">
                  <Discount content={items.discount} />
                </div>
                <div className="home__item-prod__item-img">
                  <img src={items.image} alt={items.name} />
                </div>
                <div className="home__item-prod-title">{items.name}</div>
                <div className="home__item-prod__price">
                  <div className="home__item-prod__price-before">{items.price}đ</div>
                  <div className="home__item-prod__price-after">{(items.price * (100 - items.discount)) / 100}đ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="home__item">
          <div className="home__item-content">
            <div className="home__item-content-title">Accessory</div>
            <div className="home__item-content-more">All Product</div>
          </div>
          <div className="home__item-prod">
            {cdGames?.data?.map((items: CD_GAME) => (
              <div
                key={items.id}
                className="home__item-prod__item"
                onClick={() => handleGoToAccessoryDetail(items?.id)}
              >
                <div className="home__item-prod_discount">
                  <Discount content={items.discount} />
                </div>
                <div className="home__item-prod__item-img">
                  <img src={items.image} alt={items.name} />
                </div>
                <div className="home__item-prod-title">{items.name}</div>
                <div className="home__item-prod__price">
                  <div className="home__item-prod__price-before">{items.price}đ</div>
                  <div className="home__item-prod__price-after">{(items.price * (100 - items.discount)) / 100}đ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="home__item">
          <div className="home__item-content">
            <div className="home__item-content-title">Gift Card</div>
            <div className="home__item-content-more">All Product</div>
          </div>
          <div className="home__item-prod">
            {cdGames?.data?.map((items: CD_GAME) => (
              <div key={items.id} className="home__item-prod__item" onClick={() => handleGoToGiftCard(items?.id)}>
                <div className="home__item-prod_discount">
                  <Discount content={items.discount} />
                </div>
                <div className="home__item-prod__item-img">
                  <img src={items.image} alt={items.name} />
                </div>
                <div className="home__item-prod-title">{items.name}</div>
                <div className="home__item-prod__price">
                  <div className="home__item-prod__price-before">{items.price}đ</div>
                  <div className="home__item-prod__price-after">{(items.price * (100 - items.discount)) / 100}đ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
