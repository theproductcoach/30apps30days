"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
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
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);

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
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.isUser ? "user-message" : "assistant-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
      </form>
    </div>
  );
}
