import React, { createContext, useContext, useState } from "react";

const StreamContext = createContext();

export function StreamProvider({ children }) {
  const [cameraStream, setCameraStream] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  const setStreams = ({camera, mic, videoState, micState}) => {
    if (camera) setCameraStream(camera);
    if (mic) setMicStream(mic);
    if (videoState) setIsVideoOn(videoState);
    if (micState) setIsMicOn(micState);
  };

  const clearStreams = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    if (micStream) {
      micStream.getTracks().forEach((track) => track.stop());
    }
    setCameraStream(null);
    setMicStream(null);
    setIsVideoOn(false);
    setIsMicOn(false);
  };

  return (
    <StreamContext.Provider
      value={{
        cameraStream,
        micStream,
        isVideoOn,
        isMicOn,
        setStreams,
        clearStreams,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}

export function useStream() {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
}
