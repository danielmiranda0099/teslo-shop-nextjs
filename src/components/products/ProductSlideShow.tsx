'use client'
import { useState } from "react";
import { Swiper ,SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from 'swiper';

// Import Swiper styles
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './productSlideShow.css';

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from "next/image";

interface Props {
  title: string;
  images: string[];
  className?: string;
}

export function ProductSlideShow({title, images, className}: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        loop={true}
        spaceBetween={images.length}
        navigation={true}
        autoplay={{
          delay: 3000,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map( (image) => (
            <SwiperSlide key={image}>
              <Image src={`/products/${image}`} alt={title} width={1024} height={800} className="rounded-lg object-fill"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={images.length}
        slidesPerView={images.length + 1}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map( (image) => (
            <SwiperSlide key={image}>
              <Image src={`/products/${image}`} alt={title} width={300} height={300} className="rounded-lg object-fill"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
