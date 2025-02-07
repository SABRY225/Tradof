import React, { useState } from "react";
import Button from "../../UI/Button";
import ButtonFelid from "@/UI/ButtonFelid";

export default function SubscriptionSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const cards = [
    {
      id: 0,
      plan: "SUBSCRIPTION PERIOD",
      timing: "3 MONTH",
      price: "150 EUR",
      detailedPrice: "( 50 EUR monthly )",
    },
    {
      id: 1,
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

  const getCardClasses = (index) => {
    if (index === activeIndex) {
      return "w-[260px] z-10 scale-110 ";
    }
    return "w-[250px] z-0 scale-90 blur-sm";
  };

  const reorderedCards = [
    cards[(activeIndex - 1 + cards.length) % cards.length],
    cards[activeIndex],
    cards[(activeIndex + 1) % cards.length],
  ];

  return (
    <div className="h-[550px] md:max-h-screen flex flex-col items-center justify-center space-y-8 overflow-hidden">
      {/* Cards */}
      <div className="relative flex items-center justify-center space-x-[-12px]">
        {reorderedCards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => setActiveIndex(card.id)}
            className={`min-h-[350px] flex gap-2 items-center justify-center flex-col rounded-2xl shadow-lg shadow-black/20 transform transition-all duration-300 cursor-pointer bg-gradient-to-br from-[#CE5BEB] to-[#5B61EB] ${getCardClasses(
              card.id
            )}`}
          >
            <div className="text-white text-xl font-bold">{card.plan}</div>
            <div className="text-white text-md font-light">{card.timing}</div>
            <div className="text-white text-2xl font-bold">{card.price}</div>
            <div className="text-white text-md font-light">
              {card.detailedPrice}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex space-x-3">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => setActiveIndex(index)}
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
