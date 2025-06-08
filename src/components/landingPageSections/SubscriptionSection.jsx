import React, { useState } from "react";
import ButtonFelid from "@/UI/ButtonFelid";
import { useNavigate } from "react-router-dom";

export default function SubscriptionSection({ cards }) {
  const [activeIndex, setActiveIndex] = useState(
    cards.find((card) => card.price === 0).index
  );
  const navigate = useNavigate();
  const getCardClasses = (index) => {
    if (index === activeIndex) {
      return "w-[260px] z-10 scale-110 ";
    }
    return "w-[250px] z-0 scale-90 blur-sm";
  };

  const reorderedCards = cards
    ? [
        cards[(activeIndex - 1 + cards.length) % cards.length],
        cards[activeIndex],
        cards[(activeIndex + 1) % cards.length],
      ]
    : null;

  return (
    <div className="h-[550px] md:max-h-screen flex flex-col items-center justify-center space-y-8 overflow-hidden">
      {/* Cards */}
      <div className="relative flex items-center justify-center space-x-[-12px]">
        {reorderedCards &&
          reorderedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveIndex(card.index)}
              className={`min-h-[350px] flex gap-2 items-center justify-center flex-col rounded-2xl shadow-lg shadow-black/20 transform transition-all duration-300 cursor-pointer bg-gradient-to-br from-[#CE5BEB] to-[#5B61EB] ${getCardClasses(
                card.index
              )}`}
            >
              <div className="text-white text-xl font-bold">
                {card.description}
              </div>
              <div className="text-white text-md font-light">{card.name}</div>
              <div className="text-white text-2xl font-bold">
                {card.price || "Free"}
              </div>
              <div className="text-white text-md font-light">
                ${Math.ceil(card.price / card.durationInMonths)} / month
              </div>
            </div>
          ))}
      </div>

      {/* Dots */}
      <div className="flex space-x-3">
        {cards &&
          cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(card.index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === activeIndex
                  ? "bg-[#5B61EB]"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
            ></button>
          ))}
      </div>

      {/* Button */}
      <ButtonFelid
        type="button"
        text="Try now"
        classes="text-[15px] px-[35px] py-[10px] bg-main-color"
        onClick={() => navigate("/auth")}
      />
    </div>
  );
}
