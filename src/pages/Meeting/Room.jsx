import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStream } from "@/context/StreamContext";
import peer from "@/Util/peer";

import { message } from "antd";
import Cookies from "js-cookie";
import { useSocket } from "@/context/SocketProvider";
import VideoShow from "./VideoShow";
import VideoControls from "./VideoControls";
import { Button } from "@/components/ui/button";
import {
  faArrowAltCircleRight,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatSidebar from "./ChatSidebar";

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function Room() {
  const { roomId } = useParams();
  const {
    cameraStream,
    micStream,
    isVideoOn: initialVideoOn,
    isMicOn: initialMicOn,
    setStreams,
  } = useStream();
  const [isMicOn, setMicOn] = useState(initialMicOn);
  const [isVideoOn, setVideoOn] = useState(initialVideoOn);
  const [remoteMicOn, setRemoteMicOn] = useState(false);
  const [remoteVideoOn, setRemoteVideoOn] = useState(false);
  const firstName = Cookies.get("firstName");
  const lastName = Cookies.get("lastName");
  const role = Cookies.get("role");
  const email = Cookies.get("email");
  const profileImageUrl = Cookies.get("profileImageUrl");
  // const [networkStatus, setNetworkStatus] = useState("Excellent");
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [activeStartCall, setActiveStartCall] = useState(true);
  const [participant, setParticipant] = useState(undefined);
  const [callState, setCallState] = useState("start");
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const startTimeRef = useRef(Date.now());
  // Add timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );
      setDuration(elapsedSeconds);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const initStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        myStream.getAudioTracks().forEach(track => track.enabled = true);// Disable all tracks
        setMyStream(stream);
      } catch (err) {
        console.error("Error getting user media", err);
      }
    };
    if (cameraStream || micStream) {
      const newStream = new MediaStream();

      if (cameraStream) {
        cameraStream
          .getVideoTracks()
          .forEach((track) => newStream.addTrack(track));
      }

      if (micStream) {
        micStream
          .getAudioTracks()
          .forEach((track) => newStream.addTrack(track));
      }
      console.log(newStream);
      setMyStream(newStream);
    } else {
      initStream();
    }
    socket.emit("join-room", { roomId: roomId, email: email });
    // Cleanup function
    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId, socket, cameraStream, micStream]);

  const handleSocketError = useCallback((error) => {
    message.error(error?.message || "An error occurred in the meeting");
    console.error("Socket Error:", error);
  }, []);

  const handleCallUser = useCallback(async () => {
    console.log(remoteSocketId);
    if (!remoteSocketId) {
      handleSocketError({ message: "Wait until your participation join" });
      return;
    }
    try {
      console.log("CALL USER");
      const offer = await peer.getOffer();
      socket.emit("call-user", { to: remoteSocketId, offer });
      setCallState("end");
    } catch (error) {
      console.error("Error initiating call:", error);
    }
  }, [remoteSocketId, socket]);

  const handleUserJoined = useCallback(
    async ({ user, socketId }) => {
      console.log(`Email ${user.user.email} joined room`);
      setRemoteSocketId(socketId);
    },
    [handleCallUser]
  );

  const handleJoinRoom = useCallback(
    async ({ user, roomId, participants }) => {
      console.log(user, roomId, participants);
      setParticipant(participants.user);
      if (participants.socketId) {
        setActiveStartCall(false);
      } else {
        setActiveStartCall(true);
      }
    },
    [handleCallUser]
  );

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const ans = await peer.getAnswer(offer);
      setActiveStartCall(true);
      socket.emit("call-accepted", { to: from, answer: ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (!myStream || !peer.peer) return;

    const existingSenders = peer.peer.getSenders();
    const existingTrackIds = new Set(
      existingSenders.map((sender) => sender.track?.id)
    );

    myStream.getTracks().forEach((track) => {
      if (!existingTrackIds.has(track.id)) {
        console.log("Adding new track:", track.kind);
        peer.peer.addTrack(track, myStream);
      }
    });
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, answer }) => {
      await peer.setLocalDescription(answer);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer-negotiation-needed", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer-negotiation-needed-done", { to: from, answer: ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ answer }) => {
    await peer.setLocalDescription(answer);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  const handleLeaveMeeting = useCallback(async () => {
    try {
      console.log("LEAVE");
      // Stop and disable all local tracks
      if (myStream) {
        myStream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        myStream.getVideoTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        myStream.getAudioTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      }

      // Stop and disable all remote tracks
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        remoteStream.getVideoTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        remoteStream.getAudioTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      }

      // Close peer connection if it exists
      if (peer.peer) {
        peer.sendMessage({
          type: "leave",
          email: email,
          timestamp: Date.now(),
        });
        peer.peer.close();
      }
      socket.emit("user-disconnect", { roomId });
      window.location.href = "../waiting/" + roomId;

      // Reset all states
      setMyStream(null);
      setRemoteStream(null);
      setRemoteSocketId(null);

      // Notify the other user and navigate
    } catch (error) {
      console.error("Error while disconnecting:", error);
      // Still try to navigate even if there's an error
      window.location.href = "../waiting/" + roomId;
    }
  }, [myStream, remoteStream, remoteSocketId, socket]);

  const handleLeaveMeetingWithConfirmation = useCallback(async () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave the meeting? This will end your participation."
    );

    if (!confirmLeave) {
      return;
    }

    // Use the improved leave function
    await handleLeaveMeeting();
  }, [handleLeaveMeeting]);

  // // You can also add this cleanup function to handle page unload
  const handlePageUnload = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    if (peer?.peer) {
      peer.sendMessage({
        type: "leave",
        email: email,
        timestamp: Date.now(),
      });
      peer.peer.close();
    }
    if (socket) {
      socket.emit("user-disconnect", { roomId, email });
    }
  }, [myStream, peer, socket, roomId, email]);

  // Add this useEffect to handle page unload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      handlePageUnload();
      // Optionally show confirmation dialog
      event.returnValue = "Are you sure you want to leave the meeting?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handlePageUnload]);

  useEffect(() => {
    socket.on("room-joined", handleJoinRoom);
    socket.on("user-joined", handleUserJoined);
    socket.on("call-incoming", handleIncommingCall);
    socket.on("error", handleSocketError);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("peer-negotiation-needed", handleNegoNeedIncomming);
    socket.on("peer-negotiation-needed-final", handleNegoNeedFinal);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("room-joined", handleJoinRoom);
      socket.off("error", handleSocketError);
      socket.off("call-incoming", handleIncommingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("peer-negotiation-needed", handleNegoNeedIncomming);
      socket.off("peer-negotiation-needed-final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Redirect to home page on refresh
      // window.location.href = "/meeting";
      navigate("/meeting"); // safely redirect using React Router
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log("Remote stream updated:", remoteStream);

    if (!remoteStream) {
      // Reset states when no remote stream
      setRemoteMicOn(false);
      setRemoteVideoOn(false);
      return;
    }

    const audioTrack = remoteStream.getAudioTracks()[0];
    const videoTrack = remoteStream.getVideoTracks()[0];

    console.log("Remote tracks:", { audioTrack, videoTrack });

    // Handle audio track
    if (audioTrack) {
      // Check both enabled state and muted state
      const isAudioActive = audioTrack.enabled && !audioTrack.muted;
      setRemoteMicOn(isAudioActive);

      console.log("Audio track state:", {
        enabled: audioTrack.enabled,
        muted: audioTrack.muted,
        readyState: audioTrack.readyState,
        isActive: isAudioActive,
      });

      // Set up event listeners
      const handleAudioMute = () => {
        console.log("Remote audio muted");
        setRemoteMicOn(false);
      };

      const handleAudioUnmute = () => {
        console.log("Remote audio unmuted");
        setRemoteMicOn(audioTrack.enabled); // Only set true if also enabled
      };

      const handleAudioEnded = () => {
        console.log("Remote audio track ended");
        setRemoteMicOn(false);
      };

      // Add event listeners
      audioTrack.addEventListener("mute", handleAudioMute);
      audioTrack.addEventListener("unmute", handleAudioUnmute);
      audioTrack.addEventListener("ended", handleAudioEnded);

      // Cleanup function for audio
      var cleanupAudio = () => {
        audioTrack.removeEventListener("mute", handleAudioMute);
        audioTrack.removeEventListener("unmute", handleAudioUnmute);
        audioTrack.removeEventListener("ended", handleAudioEnded);
      };
    } else {
      setRemoteMicOn(false);
      var cleanupAudio = () => {};
    }

    // Handle video track
    if (videoTrack) {
      // Check both enabled state and muted state
      const isVideoActive = videoTrack.enabled && !videoTrack.muted;
      setRemoteVideoOn(isVideoActive);

      console.log("Video track state:", {
        enabled: videoTrack.enabled,
        muted: videoTrack.muted,
        readyState: videoTrack.readyState,
        isActive: isVideoActive,
      });

      // Set up event listeners
      const handleVideoMute = () => {
        console.log("Remote video muted");
        setRemoteVideoOn(false);
      };

      const handleVideoUnmute = () => {
        console.log("Remote video unmuted");
        setRemoteVideoOn(videoTrack.enabled); // Only set true if also enabled
      };

      const handleVideoEnded = () => {
        console.log("Remote video track ended");
        setRemoteVideoOn(false);
      };

      // Add event listeners
      videoTrack.addEventListener("mute", handleVideoMute);
      videoTrack.addEventListener("unmute", handleVideoUnmute);
      videoTrack.addEventListener("ended", handleVideoEnded);

      // Cleanup function for video
      var cleanupVideo = () => {
        videoTrack.removeEventListener("mute", handleVideoMute);
        videoTrack.removeEventListener("unmute", handleVideoUnmute);
        videoTrack.removeEventListener("ended", handleVideoEnded);
      };
    } else {
      setRemoteVideoOn(false);
      var cleanupVideo = () => {};
    }

    // Cleanup function
    return () => {
      cleanupAudio();
      cleanupVideo();
    };
  }, [remoteStream, setRemoteMicOn, setRemoteVideoOn]);

  const toggleMicrophone = useCallback(async () => {
    if (!myStream) {
      console.warn("No stream available");
      return;
    }

    const audioTrack = myStream.getAudioTracks()[0];
    console.log("Current audio track:", audioTrack);

    if (audioTrack) {
      // Audio track exists, just toggle it
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
      console.log(`Microphone ${audioTrack.enabled ? "enabled" : "disabled"}`);

      // Send mic state to remote peer via data channel
      const messageSent = peer.sendMessage({
        type: "micToggle",
        enabled: audioTrack.enabled,
        timestamp: Date.now(),
      });

      if (!messageSent) {
        console.warn("Could not send mic state to remote peer");
      }
    } else if (!isMicOn) {
      // No audio track exists and mic is off, create new track
      try {
        console.log("Creating new audio track...");
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const newAudioTrack = audioStream.getAudioTracks()[0];

        if (newAudioTrack) {
          // Add the new track to the existing stream
          myStream.addTrack(newAudioTrack);

          // Enable the track
          newAudioTrack.enabled = true;
          setMicOn(true);

          console.log("New audio track created and enabled:", newAudioTrack);

          // Update peer connection with new track
          if (peer.peer && callState !== "end") {
            try {
              const senders = peer.peer.getSenders();
              const audioSender = senders.find(
                (sender) =>
                  sender.track === null || sender.track?.kind === undefined
              );

              if (audioSender) {
                // Replace null track with new audio track
                await audioSender.replaceTrack(newAudioTrack);
              } else {
                // Add new sender for audio track
                peer.peer.addTrack(newAudioTrack, myStream);
              }

              console.log("Peer connection updated with new audio track");
            } catch (peerError) {
              console.error("Error updating peer connection:", peerError);
            }
          }

          // Send mic state to remote peer
          peer.sendMessage({
            type: "micToggle",
            enabled: true,
            timestamp: Date.now(),
          });

          // Update the stream state to trigger re-render
          setMyStream(new MediaStream([...myStream.getTracks()]));
        }
      } catch (error) {
        console.error("Error creating new audio track:", error);
        // Could show user notification here
      }
    } else {
      console.warn("No audio track available and mic is already on");
    }
  }, [myStream, isMicOn, callState, peer, setMicOn, setMyStream]);

  const toggleCamera = useCallback(async () => {
    if (!myStream) {
      console.warn("No stream available");
      return;
    }

    const videoTrack = myStream.getVideoTracks()[0];
    console.log("Current video track:", videoTrack);

    if (videoTrack) {
      // Video track exists, just toggle it
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
      console.log(`Camera ${videoTrack.enabled ? "enabled" : "disabled"}`);

      // Send camera state to remote peer via data channel
      const messageSent = peer.sendMessage({
        type: "videoToggle",
        enabled: videoTrack.enabled,
        timestamp: Date.now(),
      });

      if (!messageSent) {
        console.warn("Could not send camera state to remote peer");
      }
    } else if (!isVideoOn) {
      // No video track exists and camera is off, create new track
      try {
        console.log("Creating new video track...");
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const newVideoTrack = videoStream.getVideoTracks()[0];

        if (newVideoTrack) {
          // Add the new track to the existing stream
          myStream.addTrack(newVideoTrack);

          // Enable the track
          newVideoTrack.enabled = true;
          setVideoOn(true);

          console.log("New video track created and enabled:", newVideoTrack);

          // Update peer connection with new track
          if (peer.peer && callState !== "end") {
            try {
              const senders = peer.peer.getSenders();
              const videoSender = senders.find(
                (sender) =>
                  sender.track === null || sender.track?.kind === undefined
              );

              if (videoSender) {
                // Replace null track with new video track
                await videoSender.replaceTrack(newVideoTrack);
              } else {
                // Add new sender for video track
                peer.peer.addTrack(newVideoTrack, myStream);
              }

              console.log("Peer connection updated with new video track");
            } catch (peerError) {
              console.error("Error updating peer connection:", peerError);
            }
          }

          // Send camera state to remote peer
          peer.sendMessage({
            type: "videoToggle",
            enabled: true,
            timestamp: Date.now(),
          });

          // Update the stream state to trigger re-render
          setMyStream(new MediaStream([...myStream.getTracks()]));
        }
      } catch (error) {
        console.error("Error creating new video track:", error);
        message.error("Failed to access camera. Please check your permissions.");
      }
    } else {
      console.warn("No video track available and camera is already on");
    }

    // Update peer connection for existing tracks
    if (videoTrack && peer.peer && callState !== "end") {
      try {
        const senders = peer.peer.getSenders();
        const videoSender = senders.find(
          (sender) => sender.track?.kind === "video"
        );

        if (videoSender && videoSender.track) {
          // The track is already updated, no need to modify sender.track.enabled
          // The peer connection will automatically reflect the track state
          console.log("Peer connection will reflect video track state change");
        }
      } catch (peerError) {
        console.error("Error updating peer connection:", peerError);
      }
    }
  }, [myStream, isVideoOn, callState, peer, setVideoOn, setMyStream]);

  useEffect(() => {
    // Listen for mic toggle messages from remote peer
    peer.onMessage("micToggle", (message) => {
      console.log("Received mic toggle from remote:", message.enabled);
      setRemoteMicOn(message.enabled);
    });

    // Listen for camera toggle messages from remote peer
    peer.onMessage("videoToggle", (message) => {
      console.log("Received camera toggle from remote:", message.enabled);
      setRemoteVideoOn(message.enabled);
    });

    peer.onMessage("leave", (message) => {
      handleSocketError({ message: `User ${message.email} leave meeting` });
      setCallState("start");
      setRemoteMicOn(false);
      setRemoteSocketId(null);
      setRemoteStream(null);
      setRemoteVideoOn(false);
    });

    // Cleanup on unmount
    return () => {
      peer.offMessage("micToggle");
      peer.offMessage("videoToggle");
      peer.offMessage("leave");
    };
  }, []);

  useEffect(() => {
    // Listen for chat messages from remote peer
    peer.onMessage("chat", (message) => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: message.text,
          sender: message.sender,
          timestamp: message.timestamp,
          isOwn: false,
        },
      ]);
      if (!isChatOpen) {
        setUnreadMessages((prev) => prev + 1);
      }
    });

    return () => {
      peer.offMessage("chat");
    };
  }, [isChatOpen]);

  const handleSendMessage = useCallback((message) => {
    const newMessage = {
      text: message,
      sender: firstName + " " + lastName,
      timestamp: Date.now(),
      isOwn: true,
    };

    setChatMessages((prev) => [...prev, newMessage]);

    // Send message to remote peer
    peer.sendMessage({
      type: "chat",
      ...newMessage,
    });
  }, []);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      setUnreadMessages(0);
    }
  }, [isChatOpen]);

  console.log(participant);

  return (
    <div className="bg-background-color">
      <div className="flex h-[100vh]">
        <div className="flex-1 p-2 sm:p-4 flex flex-col">
          <div className="bg-white border border-[#e5e3ff] text-[#6c63ff] p-2 rounded-lg mb-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-xs text-gray-400">Duration:</span>
                <span className="ml-1 font-medium">{formatTime(duration)}</span>
              </div>
            </div>
            {callState === "start" && (
              <div>
                <Button
                  variant="default"
                  onClick={handleLeaveMeeting}
                  className={`!rounded-button bg-red-500 hover:bg-red-600 text-white`}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              </div>
            )}
          </div>
          {/* Video Grid */}
          <div
            className={`max-w-screen-xl mx-auto w-full py-[30px] grid grid-cols-1 ${
              callState === "end" ? "sm:grid-cols-2" : ""
            } gap-2 sm:gap-4 mb-4 overflow-y-auto h-[550px]`}
          >
            <VideoShow
              isMicOn={isMicOn}
              isVideoOn={isVideoOn}
              stream={myStream}
              user={{
                email,
                role,
                lastName,
                firstName,
                profileImageUrl,
              }}
            />
            {callState === "end" && (
              <VideoShow
                isMicOn={remoteMicOn}
                isVideoOn={remoteVideoOn}
                stream={remoteStream}
                remote={true}
                user={participant}
              />
            )}
          </div>

          {/* Controls */}
          <VideoControls
            isMicOn={isMicOn}
            isVideoOn={isVideoOn}
            onToggleMic={toggleMicrophone}
            onToggleCamera={toggleCamera}
            callState={callState}
            activeStartCall={remoteSocketId}
            handleCallState={
              callState === "end"
                ? handleLeaveMeetingWithConfirmation
                : handleCallUser
            }
            participant={participant}
            isChatOpen={isChatOpen}
            onToggleChat={handleToggleChat}
            unreadMessages={unreadMessages}
          />
        </div>
      </div>

      {/* Chat Sidebar */}
      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
