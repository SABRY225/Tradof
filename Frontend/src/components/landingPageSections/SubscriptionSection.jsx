import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import ButtonFelid from "../../UI/ButtonFelid";
import "../../styles/SwiperStyle.css";
import { Tune } from "@mui/icons-material";

export default function SubscriptionSection({ ...prams }) {
  const cards = [
    {
      id: 1,
      plan: "SUBSCRIPTION PERIOD",
      timing: "3 MONTH",
      price: "150 EUR",
      detailedPrice: "( 50 EUR monthly )",
    },
    {
      id: 0,
      plan: "TRIAL PERIOD",
      timing: "1 MONTH",
      price: "FREE",
      detailedPrice: "",
    },
    {
      id: 2,
      plan: "SUBSCRIPTION PERIOD",
      timing: "1 YEAR",
      price: "500 EUR",
      detailedPrice: "( 45 EUR monthly )",
    },
  ];

  return (
    <div {...prams} className="my-[90px] w-full flex flex-col items-center">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={Math.floor(cards.length / 2)} // Start from the middle slide
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container w-full"
      >
        {cards.map((card) => (
          <SwiperSlide
            key={card._id}
            style={{
              maxWidth: "367px",
              maxHeight: "478px",
              overflow: "hidden",
            }}
            className="transition-all duration-300"
          >
            <div
              className="text-white h-[478px] w-[367px] rounded-[26px] bg-gradient-to-br from-[#CE5BEB] to-[#5B61EB] flex flex-col items-center justify-center"
            >
              <div className="font-chivo text-[35px] font-bold max-w-[300px] text-center mb-[30px]">
                {card.plan}
              </div>
              <div className="font-chivo text-[20px] font-light mb-[40px]">
                {card.timing}
              </div>
              <div className="font-chivo text-[40px] font-bold mb-[13px]">
                {card.price}
              </div>
              <div className="font-chivo text-[18px] font-light">
                {card.detailedPrice}
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* <div className="swiper-pagination mt-[20px]"></div> */}
      </Swiper>
      {/* Button */}
      <ButtonFelid
        text="Try it now"
        classes="text-[20px] px-[20px] py-[10px] mt-[50px] bg-main-color" 
        onClick={() => alert("click")}
        style={{ width: "154px" }}
      />
    </div>
  );
}
