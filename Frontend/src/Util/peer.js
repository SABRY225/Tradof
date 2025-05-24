class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });

      // Create data channel for communication
      this.dataChannel = null;
      this.messageHandlers = new Map();

      // Set up data channel event handlers
      this.setupDataChannelHandlers();
    }
  }

  setupDataChannelHandlers() {
    // Handle incoming data channels (for the receiver)
    this.peer.ondatachannel = (event) => {
      const channel = event.channel;
      this.setupChannelEventHandlers(channel);
    };
  }

  // Create data channel (call this from the caller side)
  createDataChannel(label = "communication") {
    if (this.peer && !this.dataChannel) {
      this.dataChannel = this.peer.createDataChannel(label, {
        ordered: true,
      });
      this.setupChannelEventHandlers(this.dataChannel);
    }
    return this.dataChannel;
  }

  setupChannelEventHandlers(channel) {
    channel.onopen = () => {
      console.log("Data channel opened");
      this.dataChannel = channel;
    };

    channel.onclose = () => {
      console.log("Data channel closed");
    };

    channel.onerror = (error) => {
      console.error("Data channel error:", error);
    };

    channel.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Error parsing data channel message:", error);
      }
    };
  }

  // Send message through data channel
  sendMessage(message) {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(JSON.stringify(message));
      return true;
    } else {
      console.warn(
        "Data channel not ready. State:",
        this.dataChannel?.readyState
      );
      return false;
    }
  }

  // Handle incoming messages
  handleMessage(message) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    } else {
      console.log("Unhandled message type:", message.type, message);
    }
  }

  // Register message handler
  onMessage(type, handler) {
    this.messageHandlers.set(type, handler);
  }

  // Remove message handler
  offMessage(type) {
    this.messageHandlers.delete(type);
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    }
  }

  async setLocalDescription(answer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  async getOffer() {
    if (this.peer) {
      // Create data channel before creating offer (caller side)
      this.createDataChannel();

      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  // Clean up
  close() {
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
    if (this.peer) {
      this.peer.close();
      this.peer = null;
    }
    this.messageHandlers.clear();
  }
}

export default new PeerService();
