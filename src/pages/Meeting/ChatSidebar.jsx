import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatSidebar({
  isOpen,
  onClose,
  messages = [],
  onSendMessage,
}) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white border-l border-[#e5e3ff] shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-full sm:w-80 md:w-96 z-50`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#e5e3ff] flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#6c63ff]">Chat</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-[#6c63ff]/10"
          >
            <FontAwesomeIcon icon={faXmark} className="text-[#6c63ff]" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto custom-scroll">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isOwn
                      ? "bg-[#6c63ff] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{msg.sender}</div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[#e5e3ff]">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-[#e5e3ff] focus:border-[#6c63ff] focus:ring-[#6c63ff]"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-[#6c63ff] hover:bg-[#5a52d5]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
