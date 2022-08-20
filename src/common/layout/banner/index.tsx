import useAdvertisementQuery from '@hooks/useAdvertisementQuery'
import React from 'react'
import Slider from 'react-slick'

const Banner = () => {
  const { data: advertisement } = useAdvertisementQuery()
  const data = advertisement?.data

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="banner">
      <div className="banner-container">
        <Slider {...settings}>
          {data?.map((item: any) => (
            <div key={item.id} className="banner-container__image">
              <img src={item.image} alt={item.name} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Banner
