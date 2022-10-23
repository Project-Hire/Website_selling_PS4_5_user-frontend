import { CDGamDetailData } from '@src/models/cdGameDetail'
import useCDGameDetailQuery from '@hooks/useCDGameDetailQuery'
import Layout from '@src/common'
import { NextRouter, useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import { CustomModal } from '@src/common/CustomModal'
import { BuyCdGameModal } from '@src/widget/BuyCdGameModal'
import { isLogin } from '@config/function'
import { ArrowRightIcon } from '@src/common/Icon'
import QuantityButton from '@src/common/QuantityButton'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
}

const CDGameDetail = () => {
  const router: NextRouter = useRouter()
  const { data: cdGame } = useCDGameDetailQuery(router.query.id as string)
  const data: CDGamDetailData = cdGame?.data
  const image: string[] = useMemo(() => data?.image?.split(','), [cdGame])

  const [selectedImage, setSelectedImage] = useState<string>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(1)

  useEffect(() => {
    if (image) {
      setSelectedImage(image[0])
    }
  }, [cdGame])

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleSelectImage = (image: string) => {
    if (image !== selectedImage) {
      setSelectedImage(image)
    }
  }

  const handleBuy = () => {
    setIsOpenModal(true)
  }

  const handleDecreaseAmount = () => {
    setAmount(amount - 1)
  }

  const handleIncreaseAmount = () => {
    setAmount(amount + 1)
  }

  const handleGoToLogin = () => {
    router.push('/login')
  }

  return (
    <Layout>
      <div className="cd-game">
        <div className="cd-game-content">
          <div className="cd-game-content__img">
            <div className="cd-game-content__img-content">
              <img src={selectedImage} />
            </div>
            <Slider {...settings} className="cd-game-content__img-slide">
              {image?.map((img: string, index: number) => (
                <div key={index} className="cd-game-content__img-slide__part" onClick={() => handleSelectImage(img)}>
                  <img src={img} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="cd-game-content__description">
            <div className="cd-game-content__description-header">{data?.name}</div>
            <div className="cd-game-content__description-quantity">Quantity: {data?.quantity}</div>
            {data?.discount > 0 ? (
              <div className="cd-game-content__description-discount">
                <div className="cd-game-content__description-discount__before">{data?.price}$</div>
                <ArrowRightIcon width="50px" height="30px" />
                <div className="cd-game-content__description-discount__after">
                  {(data.price * (100 - data.discount)) / 100}$
                </div>
              </div>
            ) : (
              <div className="cd-game-content__description-price">{data?.price}</div>
            )}
            <div className="cd-game-content__description-disk">How many disk you want to buy</div>
            <QuantityButton
              amount={amount}
              max={data?.quantity}
              min={1}
              handleDecreaseAmount={handleDecreaseAmount}
              handleIncreaseAmount={handleIncreaseAmount}
            />
            {isLogin() ? (
              <div className="cd-game-content__description-btn">
                <div onClick={handleBuy} className="cd-game-content__description-btn__buy">
                  Buy
                </div>
                <div className="cd-game-content__description-btn__cart">Add to Cart</div>
              </div>
            ) : (
              <div onClick={handleGoToLogin}>Login</div>
            )}
          </div>
        </div>
        <div className="cd-game-description">
          <div className="cd-game-description__title">What does the product have?</div>
          <div className="cd-game-description__content" dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </div>
      </div>
      {data && (
        <CustomModal isOpen={isOpenModal} onRequestClose={handleCloseModal}>
          <BuyCdGameModal amount={amount} data={data} handleCloseModal={handleCloseModal} />
        </CustomModal>
      )}
    </Layout>
  )
}

export default CDGameDetail
