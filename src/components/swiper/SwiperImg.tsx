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
import { Article } from "@/@types/article";

export default function SwiperImg() {
  const [showNavigation, setShowNavigation] = useState(false);

  const handleShowNavigation = () => {
    setShowNavigation(true);
  };
  const handleHideNavigation = () => {
    setShowNavigation(false);
  };

  const [headline, setHeadline] = useState<Article[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchHeadline = async () => {
      try {
        const res: AxiosResponse<resData<Article[], "articles">> =
          await request.get("/headline");
        if (!ignore) {
          setHeadline([...res.data.data.articles].reverse());
        }
      } catch {
        if (!ignore) {
          setHeadline([]);
        }
      }
    };

    fetchHeadline();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div
      onMouseEnter={handleShowNavigation}
      onMouseLeave={handleHideNavigation}
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
        {headline.map((value) => (
          <SwiperSlide key={value.id}>
            <a
              href={`/articles/${value.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value.HeadImg || value.image}
                alt={value.title}
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
