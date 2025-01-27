import loginImag from "../assets/images/login.png";

function BackgroundAuth() {
  return (
    <div className="body-back bg-backLigth relative overflow-hidden">
    {/* Dots Section */}
    <div className="dots-section">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    {/* Image Section */}
    <div className="img-section">
      <img
        src={loginImag}
        alt="Login Illustration"
        className="max-w-full w-[300px] md:w-[500px]"
      />
    </div>

    {/* Circle Section */}
    <div className="circle-section"></div>

    {/* Diagonal Section */}
    <div className="diagonal-section">
      <div className="overlay-section"></div>
    </div>
  </div>
  )
}

export default BackgroundAuth