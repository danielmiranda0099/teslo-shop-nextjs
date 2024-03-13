"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./productSlideShow.css";

// import required modules

interface Props {
  title: string;
  images: string[];
  className?: string;
}

export function ProductMobileSlideShow({ title, images, className }: Props) {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "450px",
        }}
        pagination= {true}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="rounded object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
