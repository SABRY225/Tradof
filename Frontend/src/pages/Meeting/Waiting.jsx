import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import { useSocket } from "@/context/SocketProvider";
import { useStream } from "@/context/StreamContext";

export default function Waiting() {
  const { roomId: meetingId } = useParams();
  const videoRef = useRef(null);
  const socket = useSocket();
  const { setStreams } = useStream();
  const [cameraStream, setCameraStream] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const firstName = Cookies.get("firstName");
  const lastName = Cookies.get("lastName");
  const email = Cookies.get("email");
  const profileImageUrl = Cookies.get("profileImageUrl");
  const [displayName, setDisplayName] = useState(`${firstName} ${lastName}`);
  const navigate = useNavigate();

  const toggleCamera = async () => {
    if (isVideoOn) {
      cameraStream?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraStream(null);
      setIsVideoOn(!isVideoOn);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsVideoOn(!isVideoOn);
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
  };

  const toggleMic = async () => {
    if (micOn) {
      micStream?.getTracks().forEach((track) => track.stop());
      setMicStream(null);
      setMicOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicStream(stream);
        setMicOn(true);
      } catch (err) {
        console.error("Microphone error:", err);
      }
    }
  };

  // console.log(micStream, cameraStream);

  const handleJoinMeeting = useCallback(async () => {
    if (displayName && meetingId) {
      // join room
      socket.emit("join-room", { roomId: meetingId, email });
    }
  }, []);

  const handleJoinRoom = useCallback(
    (data) => {
      const {
        user: {
          user: { email },
        },
        roomId,
      } = data;
      console.log(email, roomId, data);
      // Set streams in context before navigation
      setStreams({
        camera: cameraStream,
        mic: micStream,
        videoState: isVideoOn,
        micState: micOn,
      });
      navigate(`../room/${roomId}`, { state: { email } });
    },
    [navigate, cameraStream, micStream, isVideoOn, micOn, setStreams]
  );

  const handleSocketError = useCallback((error) => {
    toast.error(
      error?.message || "An error occurred while joining the meeting",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      }
    );
    console.error("Socket Error:", error);
  }, []);

  useEffect(() => {
    socket.on("room-joined", handleJoinRoom);
    socket.on("error", handleSocketError);

    return () => {
      socket.off("room-joined", handleJoinRoom);
      socket.off("error", handleSocketError);
    };
  }, [socket, handleJoinRoom, handleSocketError]);

  return (
    <div className="min-h-screen bg-background-color flex flex-col overflow-x-hidden">
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
          <Card className="w-full max-w-md p-6 bg-white shadow-lg">
            <div className="text-center mb-6">
              Enter your details to join the meeting
            </div>
            <div className="mb-6 relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isVideoOn ? (
                  <ReactPlayer
                    ref={videoRef}
                    playing
                    muted
                    width="100%"
                    height="100%"
                    url={cameraStream}
                    style={{ borderRadius: "8px", overflow: "hidden" }}
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
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FontAwesomeIcon
                      icon={faVideoSlash}
                      className="text-4xl text-gray-400 mb-2"
                    />
                    <p className="text-gray-500">Camera is off</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  variant={!micOn ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleMic}
                  className="!rounded-button whitespace-nowrap border-[#e5e3ff] hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
                >
                  {!micOn ? (
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faMicrophone} />
                  )}
                </Button>
                <Button
                  variant={isVideoOn ? "outline" : "destructive"}
                  size="icon"
                  onClick={toggleCamera}
                  className="!rounded-button whitespace-nowrap border-[#e5e3ff] hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
                >
                  {isVideoOn ? (
                    <FontAwesomeIcon icon={faVideo} />
                  ) : (
                    <FontAwesomeIcon icon={faVideoSlash} />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="Enter your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="meeting-id">Meeting ID or Link</Label>
                <Input
                  id="meeting-id"
                  type="text"
                  value={meetingId}
                  className="bg-[#dedede] mt-1 text-black"
                  disabled
                />
              </div>
              <Button
                onClick={handleJoinMeeting}
                className="w-full mt-6 bg-[#6c63ff] hover:bg-[#5b54db] !rounded-button whitespace-nowrap"
                disabled={!displayName || !meetingId}
              >
                Join Meeting
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
