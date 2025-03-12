import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";

export default function Chat() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isAi: boolean }[]>([
    { text: "Hi there! Ask me anything about John or need career advice?", isAi: true }
  ]);

  const handleListen = () => {
    setIsListening(true);
    // Simulate AI response after 2 seconds
    setTimeout(() => {
      setIsListening(false);
      setMessages(prev => [...prev, { 
        text: "I'd love to tell you about my experience in full-stack development and cloud architecture!",
        isAi: true 
      }]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-100 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.isAi ? "justify-start" : "justify-end"} mb-4`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isAi
                    ? "bg-white shadow-md"
                    : "bg-primary text-white"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 flex justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleListen}
          className="relative w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <Mic className="w-8 h-8" />
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}