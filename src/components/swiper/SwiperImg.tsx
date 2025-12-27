"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import BlurIn from "@/components/ui/blur-in";
import { useEffect, useState } from "react";
import "./swiper.css";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { resData } from "@/@types/response";
import { article } from "@/@types/arctice";

//FIX: use database

export default function SwiperImg() {
  const [showNavigation, setShowNavigation] = useState(false);

  const handleshouwnavigation = () => {
    setShowNavigation(true);
  };
  const handledisshouwnavigation = () => {
    setShowNavigation(false);
  };

  const [headline, setHeadline] = useState<article[]>([]);

  useEffect(() => {
    const fetchHeadline = async () => {
      const res: AxiosResponse<resData<article[], "articles">> =
        await request.get("/headline");
      setHeadline(res.data.data.articles.reverse());
    };
    fetchHeadline();
  }, []);

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
        className="swiper-container"
      >
        {headline.map((value, index) => (
          <SwiperSlide key={index}>
            <a href={`/articles/${value.id}`} target="_blank">
              <img
                src={value.HeadImg}
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
