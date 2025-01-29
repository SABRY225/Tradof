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
    <div className="body-back bg-backLigth relative overflow-hidden">
      {/* Dots Section */}
      <div className="absolute grid grid-cols-5 gap-4 gap-y-6 bottom-[15%] right-[-0.5rem] z-[1]">
        {divs}
      </div>

      {/* Image Section */}
      <div className="img-section">
        <img
          src={loginImag}
          alt="Login Illustration"
          className="max-w-[800px]"
        />
      </div>

      {/* Circle Section */}
      <div className="circle-section"></div>

      {/* Diagonal Section */}
      <div className="diagonal-section">
        <div className="overlay-section"></div>
      </div>
    </div>
  );
}

export default BackgroundAuth;
