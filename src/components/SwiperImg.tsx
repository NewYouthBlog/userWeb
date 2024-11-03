"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import BlurIn from "./ui/blur-in";
import { useState } from "react";

//FIX: use database
const item = [
  { src: "/1.jpg", title: "测试第一关" },
  { src: "/2.jpg", title: " 测试第to关" },
];

export default function SwiperImg() {
  const [showNavigation, setShowNavigation] = useState(false);

  const handleshouwnavigation = () => {
    setShowNavigation(true);
  };
  const handledisshouwnavigation = () => {
    setShowNavigation(false);
  };
  return (
    <div
      onMouseEnter={handleshouwnavigation}
      onMouseLeave={handledisshouwnavigation}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={showNavigation}
        pagination={{ clickable: true }}
        // style={{ height: "50vh", width: "100%" }}

        className="w-full  sm:h-1/3 md:h-1/3 lg:h-1/2"
      >
        {item.map((value, index) => (
          <SwiperSlide key={index}>
            <a>
              <img
                src={value.src}
                style={{
                  width: "100%", // 使图片宽度适应容器
                  height: "100%", // 使图片高度适应容器
                  objectFit: "cover", // 或 'contain', 'fill' 根据需求调整
                }}
              />
              <BlurIn
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  font-consolas"
                word={value.title}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
