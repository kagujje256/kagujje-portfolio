"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function TelegramChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-lg shadow-[#0088cc]/30 transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Chat on Telegram"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-zinc-800 bg-[#0088cc] p-4">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              K
            </div>
            <div>
              <h3 className="font-semibold text-white">KAGUJJE</h3>
              <p className="text-xs text-white/70">Usually replies within an hour</p>
            </div>
          </div>

          {/* Chat Body */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-black">
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-900 border border-zinc-800 px-4 py-2 text-sm text-zinc-300">
                <p>👋 Welcome to KAGUJJE!</p>
                <p className="mt-2">I'm Kasiba Shardick. How can I help you today?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-900 border border-zinc-800 px-4 py-2 text-sm text-zinc-300">
                <p>Feel free to ask about:</p>
                <ul className="mt-1 space-y-1 text-xs text-zinc-400">
                  <li>• Website Development</li>
                  <li>• Software Installation</li>
                  <li>• Phone MDM Services</li>
                  <li>• Trading / Exness</li>
                  <li>• Business Inquiries</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer with Telegram Link */}
          <div className="border-t border-zinc-800 bg-zinc-950 p-4">
            <a
              href="https://t.me/kagujje"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0088cc] py-3 font-medium text-white transition-colors hover:bg-[#0077b5]"
            >
              <Send size={18} />
              Open Telegram
            </a>
            <p className="mt-2 text-center text-xs text-zinc-500">
              Powered by Telegram
            </p>
          </div>
        </div>
      )}
    </>
  );
}
