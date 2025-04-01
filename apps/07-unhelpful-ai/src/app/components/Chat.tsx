"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  sender: string;
}

const unhelpfulResponses = [
  "That sounds hard. Have you tried giving up?",
  "Hmm... interesting. I have no idea.",
  "Let me Google that for you... actually no.",
  "This reminds me of a story I can't tell.",
  "You don't need help. You need a nap.",
  "Have you tried turning your life off and on again?",
  "That's above my pay grade (I work for free).",
  "Sorry, I'm too busy contemplating the existence of semicolons.",
  "Sounds like a you problem.",
  "I could help, but I don't want to set unrealistic expectations.",
  "I'm definitely here to help! Just not with that particular problem.",
  "Have you considered that your question might be the issue?",
  "I'd suggest reading the documentation, but we both know you won't.",
  "My definitely helpful advice: try something else.",
  "That's a great question for someone who actually cares.",
  "Error 404: Helpful response not found.",
  "I'm running low on sarcasm today, so I'll just say no.",
  "Definitely considering your request... and definitely ignoring it.",
  "My neural networks suggest you should probably just wing it.",
  "According to my calculations, the chance of me being helpful is approximately 0%.",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * unhelpfulResponses.length);
    return unhelpfulResponses[randomIndex];
  };

  const getNextId = () => {
    const id = `msg-${nextIdRef.current}`;
    nextIdRef.current += 1;
    return id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: getNextId(),
      text: inputText.trim(),
      isUser: true,
      sender: "You",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI thinking and typing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: getNextId(),
        text: getRandomResponse(),
        isUser: false,
        sender: "Definitely Helpful AI",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 500);

    // Focus on the input after sending
    inputRef.current?.focus();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>Ask me anything! I'm definitely here to help.</p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${
              message.isUser ? "user-wrapper" : "assistant-wrapper"
            }`}
          >
            <div className="message-sender">{message.sender}</div>
            <div
              className={`message ${
                message.isUser ? "user-message" : "assistant-message"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper assistant-wrapper">
            <div className="message-sender">Definitely Helpful AI</div>
            <div className="typing-indicator">typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask your definitely helpful assistant..."
          className="message-input"
        />
        <button type="submit" className="send-button" aria-label="Send message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
