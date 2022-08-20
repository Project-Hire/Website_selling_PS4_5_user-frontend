import { CDGamDetailData } from '@src/models/cdGameDetail'
import useCDGameDetailQuery from '@hooks/useCDGameDetailQuery'
import Layout from '@src/common'
import { NextRouter, useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import { CustomModal } from '@src/common/CustomModal'
import { BuyCdGameModal } from '@src/widget/BuyCdGameModal'
import { isLogin } from '@config/function'

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
            <div className="">Quantity: {data?.quantity}</div>
            {isLogin() ? (
              <div className="cd-game-content__description-btn">
                <div onClick={handleBuy} className="cd-game-content__description-btn__buy">
                  Buy
                </div>
                <div className="cd-game-content__description-btn__cart">Add to Cart</div>
              </div>
            ) : (
              <div>Login</div>
            )}
          </div>
        </div>
      </div>
      {data && (
        <CustomModal isOpen={isOpenModal} onRequestClose={handleCloseModal}>
          <BuyCdGameModal data={data} />
        </CustomModal>
      )}
    </Layout>
  )
}

export default CDGameDetail
