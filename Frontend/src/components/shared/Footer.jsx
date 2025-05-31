import lightLogo from "../../assets/icons/lightlogo.svg";
import logo from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
function Footer({ color, borderColor, borderSize }) {
  // console.log(color,borderColor,borderSize)
  const navigate = useNavigate();
  return (
    <div
      className="font-roboto-condensed bg-background-color relative flex flex-col md:flex-row items-center justify-around text-center py-5"
      style={{ backgroundColor: color }}
    >
      {/* Add the before pseudo-element
      <div
        className={`absolute inset-x-0 top-0 before:content-[''] before:block before:h-[1.5px] before:ml-[15rem] before:md:ml-[15rem] before:rounded before:bg-${
          borderColor ? "main-color" : "white"
        }`}
        style={{ backgroundColor: borderColor }}
      ></div> */}

      {/* Section 1 */}
      <div className="flex flex-col mb-8 md:mb-0">
        <div className="flex justify-center items-center"
         onClick={() => navigate("/")}
         style={{ cursor: 'pointer' }}
        >
          <div className="w-[50px]">
            {color === "#6C63FF" ? (
              <img src={lightLogo} className="w-8 h-8" />
            ) : (
              <img src={logo} className="w-8 h-8" />
            )}
          </div>
          <div
            className={`font-markazi-text text-[22px] ${
              color === "#6C63FF" ? "text-white" : ""
            }`}
          >
            Tradof
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div
            className={`max-w-sm text-[12px] ${
              color === "#6C63FF" ? "text-white" : ""
            }`}
          >
            Your Trusted Partner in Language Translation
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-3 text-[12px]">
        <div
          className={`${color === "#6C63FF" ? "text-white" : ""}`}
          onClick={() => navigate("/privacy-policy")}
      style={{ cursor: 'pointer' }}
        >
          Privacy policy
        </div>
        <div
          className={`${color === "#6C63FF" ? "text-white" : ""}`}
          onClick={() => navigate("/service")}
      style={{ cursor: 'pointer' }}
        >
          Terms of service
        </div>
        <div className={`${color === "#6C63FF" ? "text-white" : ""}`}>
          ©2024 Copy Right
        </div>
      </div>
    </div>
  );
}

export default Footer;
