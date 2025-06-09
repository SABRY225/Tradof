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

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );
      setDuration(elapsedSeconds);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Initialize stream with audio enabled by default
  useEffect(() => {
    const initStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        // Enable audio by default, disable video by default
        stream.getAudioTracks().forEach(track => {
          track.enabled = true;
          console.log(`Audio track initialized: ${track.enabled ? 'enabled' : 'disabled'}`);
        });
        stream.getVideoTracks().forEach(track => {
          track.enabled = false;
          console.log(`Video track initialized: ${track.enabled ? 'enabled' : 'disabled'}`);
        });
        setMyStream(stream);
        setMicOn(true);
        setVideoOn(false);
      } catch (err) {
        console.error("Error getting user media", err);
        message.error("Failed to access microphone or camera. Please check permissions.");
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
          .forEach((track) => {
            track.enabled = true;
            newStream.addTrack(track);
          });
      }
      console.log("New stream with existing tracks:", newStream);
      setMyStream(newStream);
      setMicOn(true);
    } else {
      initStream();
    }
    
    socket.emit("join-room", { roomId: roomId, email: email });

    return () => {
      if (myStream) {
        console.log("Cleaning up tracks...");
        myStream.getTracks().forEach((track) => {
          console.log(`Stopping track: ${track.kind}`);
          track.stop();
        });
      }
    };
  }, [roomId, socket, cameraStream, micStream]);

  const handleSocketError = useCallback((error) => {
    message.error(error?.message || "An error occurred in the meeting");
    console.error("Socket Error:", error);
  }, []);

  const handleCallUser = useCallback(async () => {
    console.log("Calling user with remoteSocketId:", remoteSocketId);
    if (!remoteSocketId) {
      handleSocketError({ message: "Wait until your participation join" });
      return;
    }
    try {
      console.log("Creating offer...");
      const offer = await peer.getOffer();
      console.log("Emitting call-user with offer:", offer);
      socket.emit("call-user", { to: remoteSocketId, offer });
      setCallState("end");
      // Send streams immediately after call starts
      setTimeout(sendStreams, 1000);
    } catch (error) {
      console.error("Error initiating call:", error);
      message.error("Failed to start call. Please try again.");
    }
  }, [remoteSocketId, socket, handleSocketError]);

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
      console.log("Incoming call from:", from);
      setRemoteSocketId(from);
      const ans = await peer.getAnswer(offer);
      console.log("Sending answer:", ans);
      setActiveStartCall(true);
      socket.emit("call-accepted", { to: from, answer: ans });
      // Send streams immediately after accepting call
      setTimeout(sendStreams, 1000);
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (!myStream || !peer.peer) {
      console.log("Cannot send streams - myStream or peer not available");
      return;
    }

    console.log("Sending streams...");
    const audioTracks = myStream.getAudioTracks();
    const videoTracks = myStream.getVideoTracks();

    // Log current tracks
    console.log("Current audio tracks:", audioTracks);
    console.log("Current video tracks:", videoTracks);

    // Remove existing tracks first
    const senders = peer.peer.getSenders();
    senders.forEach(sender => {
      console.log(`Removing sender with track: ${sender.track?.kind}`);
      peer.peer.removeTrack(sender);
    });

    // Add audio track if exists
    if (audioTracks.length > 0) {
      console.log("Adding audio track:", audioTracks[0]);
      peer.peer.addTrack(audioTracks[0], myStream);
    } else {
      console.warn("No audio track available to send");
    }

    // Add video track if exists
    if (videoTracks.length > 0) {
      console.log("Adding video track:", videoTracks[0]);
      peer.peer.addTrack(videoTracks[0], myStream);
    } else {
      console.warn("No video track available to send");
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, answer }) => {
      console.log("Call accepted from:", from);
      await peer.setLocalDescription(answer);
      console.log("Call Accepted! Description set.");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    console.log("Negotiation needed, creating offer...");
    const offer = await peer.getOffer();
    socket.emit("peer-negotiation-needed", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      console.log("Incoming negotiation needed from:", from);
      const ans = await peer.getAnswer(offer);
      socket.emit("peer-negotiation-needed-done", { to: from, answer: ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ answer }) => {
    console.log("Setting final negotiation answer...");
    await peer.setLocalDescription(answer);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    const handleTrackEvent = async (ev) => {
      if (ev.streams && ev.streams.length > 0) {
        const remoteStream = ev.streams[0];
        console.log("Received remote stream with tracks:", remoteStream.getTracks());
        
        // Check audio tracks
        const audioTracks = remoteStream.getAudioTracks();
        if (audioTracks.length > 0) {
          console.log("Audio track received:", {
            enabled: audioTracks[0].enabled,
            muted: audioTracks[0].muted,
            readyState: audioTracks[0].readyState
          });
          setRemoteMicOn(audioTracks[0].enabled && !audioTracks[0].muted);
        } else {
          console.warn("No audio track in remote stream");
          setRemoteMicOn(false);
        }
        
        // Check video tracks
        const videoTracks = remoteStream.getVideoTracks();
        if (videoTracks.length > 0) {
          console.log("Video track received:", {
            enabled: videoTracks[0].enabled,
            muted: videoTracks[0].muted,
            readyState: videoTracks[0].readyState
          });
          setRemoteVideoOn(videoTracks[0].enabled && !videoTracks[0].muted);
        } else {
          console.warn("No video track in remote stream");
          setRemoteVideoOn(false);
        }
        
        setRemoteStream(remoteStream);
      }
    };

    peer.peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
    };
  }, []);

  const handleLeaveMeeting = useCallback(async () => {
    try {
      console.log("Leaving meeting...");
      
      // Stop local tracks
      if (myStream) {
        myStream.getTracks().forEach(track => {
          console.log(`Stopping local ${track.kind} track`);
          track.stop();
        });
      }

      // Stop remote tracks
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => {
          console.log(`Stopping remote ${track.kind} track`);
          track.stop();
        });
      }

      // Close peer connection
      if (peer.peer) {
        console.log("Closing peer connection...");
        peer.sendMessage({
          type: "leave",
          email: email,
          timestamp: Date.now(),
        });
        peer.peer.close();
      }

      // Notify server
      socket.emit("user-disconnect", { roomId });
      window.location.href = "../waiting/" + roomId;

    } catch (error) {
      console.error("Error while disconnecting:", error);
      window.location.href = "../waiting/" + roomId;
    }
  }, [myStream, remoteStream, remoteSocketId, socket, roomId, email]);

  const handleLeaveMeetingWithConfirmation = useCallback(async () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave the meeting? This will end your participation."
    );

    if (confirmLeave) {
      await handleLeaveMeeting();
    }
  }, [handleLeaveMeeting]);

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      handlePageUnload();
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

  const toggleMicrophone = useCallback(async () => {
    if (!myStream) {
      console.warn("No stream available");
      return;
    }

    const audioTracks = myStream.getAudioTracks();
    console.log("Current audio tracks:", audioTracks);

    if (audioTracks.length > 0) {
      // Toggle existing audio track
      const audioTrack = audioTracks[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
      console.log(`Microphone ${audioTrack.enabled ? "enabled" : "disabled"}`);

      // Update peer connection
      const senders = peer.peer.getSenders();
      const audioSender = senders.find(sender => sender.track?.kind === "audio");
      
      if (audioSender) {
        try {
          await audioSender.replaceTrack(audioTrack);
          console.log("Updated audio track in peer connection");
        } catch (error) {
          console.error("Error updating audio track in peer connection:", error);
        }
      }

      // Send state to remote peer
      peer.sendMessage({
        type: "micToggle",
        enabled: audioTrack.enabled,
        timestamp: Date.now(),
      });
    } else {
      // No audio track exists, create new one
      try {
        console.log("Creating new audio track...");
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const newAudioTrack = audioStream.getAudioTracks()[0];
        if (newAudioTrack) {
          myStream.addTrack(newAudioTrack);
          newAudioTrack.enabled = true;
          setMicOn(true);

          // Add to peer connection
          if (peer.peer) {
            peer.peer.addTrack(newAudioTrack, myStream);
          }

          // Send state to remote peer
          peer.sendMessage({
            type: "micToggle",
            enabled: true,
            timestamp: Date.now(),
          });

          // Update stream state
          setMyStream(new MediaStream([...myStream.getTracks()]));
        }
      } catch (error) {
        console.error("Error creating new audio track:", error);
        message.error("Failed to access microphone. Please check permissions.");
      }
    }
  }, [myStream, peer, setMicOn, setMyStream]);

  const toggleCamera = useCallback(async () => {
    if (!myStream) {
      console.warn("No stream available");
      return;
    }

    const videoTracks = myStream.getVideoTracks();
    console.log("Current video tracks:", videoTracks);

    if (videoTracks.length > 0) {
      // Toggle existing video track
      const videoTrack = videoTracks[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
      console.log(`Camera ${videoTrack.enabled ? "enabled" : "disabled"}`);

      // Update peer connection
      const senders = peer.peer.getSenders();
      const videoSender = senders.find(sender => sender.track?.kind === "video");
      
      if (videoSender) {
        try {
          await videoSender.replaceTrack(videoTrack);
          console.log("Updated video track in peer connection");
        } catch (error) {
          console.error("Error updating video track in peer connection:", error);
        }
      }

      // Send state to remote peer
      peer.sendMessage({
        type: "videoToggle",
        enabled: videoTrack.enabled,
        timestamp: Date.now(),
      });
    } else {
      // No video track exists, create new one
      try {
        console.log("Creating new video track...");
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const newVideoTrack = videoStream.getVideoTracks()[0];
        if (newVideoTrack) {
          myStream.addTrack(newVideoTrack);
          newVideoTrack.enabled = true;
          setVideoOn(true);

          // Add to peer connection
          if (peer.peer) {
            peer.peer.addTrack(newVideoTrack, myStream);
          }

          // Send state to remote peer
          peer.sendMessage({
            type: "videoToggle",
            enabled: true,
            timestamp: Date.now(),
          });

          // Update stream state
          setMyStream(new MediaStream([...myStream.getTracks()]));
        }
      } catch (error) {
        console.error("Error creating new video track:", error);
        message.error("Failed to access camera. Please check permissions.");
      }
    }
  }, [myStream, peer, setVideoOn, setMyStream]);

  useEffect(() => {
    // Listen for mic toggle messages from remote peer
    const handleMicToggle = (message) => {
      console.log("Received mic toggle from remote:", message.enabled);
      setRemoteMicOn(message.enabled);
    };

    // Listen for camera toggle messages from remote peer
    const handleVideoToggle = (message) => {
      console.log("Received camera toggle from remote:", message.enabled);
      setRemoteVideoOn(message.enabled);
    };

    const handleLeave = (message) => {
      handleSocketError({ message: `User ${message.email} leave meeting` });
      setCallState("start");
      setRemoteMicOn(false);
      setRemoteSocketId(null);
      setRemoteStream(null);
      setRemoteVideoOn(false);
    };

    peer.onMessage("micToggle", handleMicToggle);
    peer.onMessage("videoToggle", handleVideoToggle);
    peer.onMessage("leave", handleLeave);

    return () => {
      peer.offMessage("micToggle", handleMicToggle);
      peer.offMessage("videoToggle", handleVideoToggle);
      peer.offMessage("leave", handleLeave);
    };
  }, [handleSocketError]);

  useEffect(() => {
    const handleChatMessage = (message) => {
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
    };

    peer.onMessage("chat", handleChatMessage);
    return () => {
      peer.offMessage("chat", handleChatMessage);
    };
  }, [isChatOpen]);

  const handleSendMessage = useCallback((messageText) => {
    const newMessage = {
      text: messageText,
      sender: firstName + " " + lastName,
      timestamp: Date.now(),
      isOwn: true,
    };

    setChatMessages((prev) => [...prev, newMessage]);

    peer.sendMessage({
      type: "chat",
      ...newMessage,
    });
  }, [firstName, lastName]);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      setUnreadMessages(0);
    }
  }, [isChatOpen]);

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