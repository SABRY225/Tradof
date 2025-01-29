import lightLogo from "../../assets/icons/lightlogo.svg";
import logo from "../../assets/icons/logo.svg";
function Footer({ color }) {
  return (
    <div
      className="font-roboto-condensed relative flex flex-col md:flex-row items-center justify-around text-center pt-10 pb-10"
      style={{ backgroundColor: color }}
    >
      {/* Add the before pseudo-element */}
      <div
        className="absolute inset-x-0 top-0 before:content-[''] before:block before:h-[3px] before:bg-white before:ml-[15rem] before:md:ml-[15rem] before:rounded"
        style={{ backgroundColor: color }}
      ></div>

      {/* Section 1 */}
      <div className="flex flex-col mb-8 md:mb-0">
        <div className="flex justify-center items-center">
          <div className="w-[50px]">
            {color === "#6C63FF" ? (
              <img src={lightLogo} className="w-16 h-16" />
            ) : (
              <img src={logo} className="w-16 h-16" />
            )}
          </div>
          <div
            className={`ml-5 text-3xl font-markazi-text text-[35px] ${
              color === "#6C63FF" ? "text-white" : ""
            }`}
          >
            Tradof
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div
            className={`max-w-sm text-[20px] ${
              color === "#6C63FF" ? "text-white" : ""
            }`}
          >
            Your Trusted Partner in Language Translation
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-3 text-[18px]">
        <div
          className={`mb-3 text-lg ${color === "#6C63FF" ? "text-white" : ""}`}
        >
          Privacy policy
        </div>
        <div
          className={`mb-3 text-lg ${color === "#6C63FF" ? "text-white" : ""}`}
        >
          Terms of service
        </div>
        <div className={`text-lg ${color === "#6C63FF" ? "text-white" : ""}`}>
          ©2024 Copy Right
        </div>
      </div>
    </div>
  );
}

export default Footer;
