import ScrollFloat from "@/components/ui/ScrollFloat";

export default function BreakSection({ id, text, label }) {
  return (
    <>
      <div
        id={id}
        className="font-roboto-condensed flex justify-center items-center my-6 sm:my-8 md:my-10 px-4 sm:px-8 md:px-16 lg:px-32 sm:gap-8"
      >
        <div className="w-[15px] h-[15px] bg-[#6c63ff] rounded-full"></div>
        <div className="text-black flex flex-col items-center justify-center">
          <ScrollFloat
            textClassName="text-[clamp(1.6rem,4vw,3rem)] font-bold"
            ease="back.inOut(3)"
          >
            {text}
          </ScrollFloat>
          <ScrollFloat
            textClassName="text-[clamp(0.8rem,1.2vw,1.5rem)] font-light  "
            ease="back.inOut(3)"
          >
            {label}
          </ScrollFloat>
        </div>
        <div className="w-[15px] h-[15px] bg-[#6c63ff] rounded-full"></div>
      </div>
    </>
  );
}
