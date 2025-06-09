import {
  faCrown,
  faMicrophoneSlash,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

// Function to get dominant color from image
const getDominantColor = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      let r = 0,
        g = 0,
        b = 0;

      // Sample pixels to get average color
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
      }

      const pixelCount = imageData.length / 4;
      r = Math.round(r / pixelCount);
      g = Math.round(g / pixelCount);
      b = Math.round(b / pixelCount);

      resolve(`rgb(${r}, ${g}, ${b})`);
    };
    img.onerror = () => resolve("#6c63ff"); // Fallback color
    img.src = imageUrl;
  });
};

export default function VideoShow({
  isMicOn,
  isVideoOn,
  stream,
  user,
  remote = false,
}) {
  const [ready, setReady] = useState(false);
  const [dominantColor, setDominantColor] = useState("#6c63ff");
  const profileImageUrl = user.profileImageUrl || "/default-avatar.png";

  useEffect(() => {
    getDominantColor(profileImageUrl).then(setDominantColor);
  }, [profileImageUrl]);

  return (
    <div className="flex h-full items-center justify-center">
      {stream ? (
        <div className="relative border-2 border-[#6c63ff] rounded-lg overflow-hidden shadow-inside flex">
          {isVideoOn ? (
            <div className="w-full h-full relative w-full aspect-[16/9] sm:aspect-[4/3]">
              {!ready && (
                <div className="absolute inset-0 bg-black animate-pulse" />
              )}
              <ReactPlayer
                playing
                autoPlay
                height="100%"
                width="100%"
                url={stream}
                style={{ margin: "auto" }}
                onReady={() => setReady(true)}
                config={{
                  file: {
                    attributes: {
                      style: {
                        objectFit: "cover",
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="w-[550px] h-[480px] relative flex flex-col items-center justify-center m-auto">
              {/* Color background with blur */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-2xl opacity-30"
                style={{
                  backgroundColor: dominantColor,
                  backgroundImage: `url(${profileImageUrl})`,
                  transform: "scale(1.5)",
                }}
              />
              {/* Profile image */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={profileImageUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-bold text-[30px] mt-4 drop-shadow-lg">
                  {user.firstName + " " + user.lastName}
                </span>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
            <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
              {user.firstName + " " + user.lastName}
              {user.role === "CompanyAdmin" && (
                <FontAwesomeIcon
                  icon={faCrown}
                  className="text-yellow-400 ml-1"
                />
              )}
            </span>
            <div className="flex space-x-1">
              {!isMicOn && (
                <FontAwesomeIcon
                  icon={faMicrophoneSlash}
                  className="text-red-500 bg-black/50 p-1 rounded"
                />
              )}
              {!isVideoOn && (
                <FontAwesomeIcon
                  icon={faVideoSlash}
                  className="text-red-500 bg-black/50 p-1 rounded"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <span className="text-[#818384] font-bold text-[30px]">
          Waiting for participant...
        </span>
      )}
    </div>
  );
}
