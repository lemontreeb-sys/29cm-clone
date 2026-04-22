import React from "react";
import styled from "styled-components";
import { bannerData } from "../../data/bannerData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MainBanner = () => {
  return (
    <BannerContainer>
      <Swiper>
        {bannerData.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <SlideItem>
                <img src={item.image}></img>
                <TextContent>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </TextContent>
              </SlideItem>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BannerContainer>
  );
};

const BannerContainer = styled.section`
  width: 100%;
  overflow: hidden;
`;

const SlideItem = styled.article`
  position: relative;
  width: 100%;
  height: 500px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const TextContent = styled.div`
  position: absolute;
  display: flex;
  gap: 8px;
  align-items: start;
  flex-direction: column;
  bottom: 40px;
  left: 20px;
  z-index: 10;
  color: #fff;
  h2 {
    font-size: 28px;
    margin: 0;
    color: #fff;
  }
  p {
    font-size: 14px;
  }
`;
export default MainBanner;
