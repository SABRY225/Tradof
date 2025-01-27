function Footer({ color }) {
    return (
      <>
        <div style={{ backgroundColor: color }}>
          <hr className="border-t-2 border-white mx-8 md:mx-32" />
        </div>
        <div
          className="flex flex-col md:flex-row text-center pt-10 pb-10"
          style={{ backgroundColor: color }}
        >
          {/* القسم الأول */}
          <div className="flex-1 mb-8 md:mb-0">
            <div className="flex justify-center items-center">
              <div>
                {color === "#6C63FF" ? (
                  <img
                    src="./logofullColor.svg"
                    className="w-16 h-16"
                  />
                ) : (
                  <img src="vite.svg" className="w-16 h-16" />
                )}
              </div>
              <div
                className={`ml-5 text-3xl ${
                  color === "#6C63FF" ? "text-white" : ""
                }`}
              >
                Tradof
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <div
                className={`max-w-72 text-lg ${
                  color === "#6C63FF" ? "text-white" : ""
                }`}
              >
                Your Trusted Partner in Language Translation
              </div>
            </div>
          </div>
  
          {/* القسم الثاني */}
          <div className="flex-1">
            <div
              className={`mb-3 text-lg ${
                color === "#6C63FF" ? "text-white" : ""
              }`}
            >
              Privacy policy
            </div>
            <div
              className={`mb-3 text-lg ${
                color === "#6C63FF" ? "text-white" : ""
              }`}
            >
              Terms of service
            </div>
            <div
              className={`text-lg ${color === "#6C63FF" ? "text-white" : ""}`}
            >
              ©2024 Copy Right
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Footer;
  