import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  faCommentAlt,
  faDesktop,
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faPhoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VideoControls({
  isMicOn,
  isVideoOn,
  onToggleMic,
  onToggleCamera,
  onToggleChat,
  isChatOpen,
  callState,
  handleCallState,
  activeStartCall,
  participant,
  unreadMessages,
}) {
  console.log(activeStartCall, participant?.socketId);
  return (
    <div className="bg-white border border-[#e5e3ff] p-2 sm:p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={!isMicOn ? "destructive" : "outline"}
                size="icon"
                onClick={onToggleMic}
                className="!rounded-button whitespace-nowrap border-[#e5e3ff] hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
              >
                {!isMicOn ? (
                  <FontAwesomeIcon icon={faMicrophoneSlash} />
                ) : (
                  <FontAwesomeIcon icon={faMicrophone} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{!isMicOn ? "Unmute" : "Mute"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isVideoOn ? "outline" : "destructive"}
                size="icon"
                onClick={onToggleCamera}
                className="!rounded-button whitespace-nowrap border-[#e5e3ff] hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
              >
                {isVideoOn ? (
                  <FontAwesomeIcon icon={faVideo} />
                ) : (
                  <FontAwesomeIcon icon={faVideoSlash} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isChatOpen ? "destructive" : "outline"}
                size="icon"
                onClick={onToggleChat}
                className="!rounded-button whitespace-nowrap border-[#e5e3ff] hover:bg-[#6c63ff]/10 hover:text-[#6c63ff] relative"
              >
                <FontAwesomeIcon icon={faCommentAlt} />
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isChatOpen ? "Close chat" : "Open chat"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          variant="default"
          onClick={handleCallState}
          disabled={!activeStartCall}
          className={`!rounded-button whitespace-nowrap flex items-center gap-2 ${
            callState === "end"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          <FontAwesomeIcon
            icon={callState === "end" ? faPhoneSlash : faPhone}
          />
          {callState === "end"
            ? "Leave"
            : activeStartCall
            ? "Start"
            : "Waiting..."}
        </Button>
      </div>
    </div>
  );
}
