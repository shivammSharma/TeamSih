import React, { useState } from "react";
import Icon from "../AppIcon";
import { getBotReply } from "../../utils/ayurBotEngine";

const AyurChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Namaste 👋 I’m your AyurNutri assistant. Ask me about food combinations or seasonal diet.",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // simple sync "brain"
    const reply = getBotReply(text);
    const botMsg = { from: "bot", text: reply };

    setMessages((prev) => [...prev, botMsg]);
    setIsThinking(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 bg-primary text-white flex items-center justify-center shadow-lg z-50"
      >
        <Icon name="MessageCircle" size={22} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 max-w-[90vw] bg-card rounded-2xl shadow-xl border border-border flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background/90 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-brand-sage/20 flex items-center justify-center">
            <Icon name="Leaf" size={16} className="text-brand-sage" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-primary">
              AyurNutri Assistant
            </span>
            <span className="text-[11px] text-text-secondary">
              Food • Season • Dosha
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-md hover:bg-muted/50"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 max-h-80 overflow-y-auto px-3 py-2 space-y-2 text-sm">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-3 py-2 whitespace-pre-line ${
                m.from === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-text-secondary rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-3 py-2 bg-muted text-text-secondary text-xs">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="border-t border-border p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Try: "Is milk with banana okay?"'
          className="flex-1 text-sm px-2 py-1.5 rounded-md border border-border focus:outline-none focus:ring-0 bg-background"
        />
        <button
          type="submit"
          className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50"
          disabled={!input.trim()}
        >
          <Icon name="Send" size={14} />
        </button>
      </form>
    </div>
  );
};

export default AyurChatWidget;
