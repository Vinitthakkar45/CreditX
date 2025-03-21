import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Loader2 } from "lucide-react";

// Mock API call to the LLM - Replace with your actual API integration
const mockLLMResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // This is a placeholder - replace with your actual API call
  return `This is a simulated response to your question: "${message}". Replace this function with your actual API call to your LLM service.`;
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isBot: boolean; timestamp: string }>>([
    {
      content: "Hello! I'm your financial assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      { content: message, isBot: false, timestamp },
    ]);
    
    setIsLoading(true);
    
    try {
      // Replace this with your actual API call
      const response = await mockLLMResponse(message);
      
      // Add bot response
      setMessages((prev) => [
        ...prev,
        { content: response, isBot: true, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        { 
          content: "Sorry, I encountered an error processing your request. Please try again.",
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-background/20 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="flex flex-col">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              content={msg.content}
              isBot={msg.isBot}
              timestamp={msg.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="self-start flex items-center gap-2 p-4 bg-chat-bot/50 backdrop-blur-sm border border-bureau-cibil/10 rounded-xl mb-4 animate-pulse">
              <Loader2 className="h-4 w-4 text-bureau-cibil animate-spin" />
              <span className="text-sm text-foreground/80">Thinking...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </motion.div>
  );
};

export default ChatInterface;