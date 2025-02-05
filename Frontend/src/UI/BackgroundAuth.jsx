import loginImag from "../assets/images/login.png";

function BackgroundAuth() {
  const divs = Array.from({ length: 50 }, (_, index) => (
    <div
      key={index}
      className="bg-[#fff] w-[1rem] h-[1rem] rounded-full mb-2 opacity-[22%]"
      style={{
        clipPath: "circle(50% at 50% 50%)",
      }}
    ></div>
  ));

  return (
    <>
      <div className="absolute w-full h-full background z-[-1]">
        <div
          className="polygon-background-1 z-[-1] absolute bg-[#d2d4f6] h-full w-full"
          style={{
            clipPath: "polygon(0% 15%, 100% 98%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div
          className="polygon-background-2 z-[-1] absolute bg-[#6c63ff] h-full w-full"
          style={{
            clipPath: "polygon(0% 30%, 100% 100%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div
          className="z-[-1] absolute bg-[#fff] w-[30rem] h-[30rem] bottom-[0] left-[-12rem] opacity-[5%]"
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
        ></div>
        <div className="absolute grid grid-cols-5 gap-4 gap-y-6 bottom-[2%] left-[-0.5rem] z-[-1]">
          {divs}
        </div>
        <div className="fixed top-0 left-0 w-full h-full bg-[#FEFEFE] bg-opacity-[10%] backdrop-blur-sm z-[-1]"></div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .polygon-background-1 {
            clip-path: polygon(0% 15%, 100% 60%, 100% 100%, 0% 100%) !important;
          }
          .polygon-background-2 {
            clip-path: polygon(0% 30%, 100% 70%, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
    </>
  );
}

export default BackgroundAuth;
