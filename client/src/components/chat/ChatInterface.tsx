import { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Chat } from "@shared/schema";

interface ChatInterfaceProps {
  chats: Chat[];
  onSendMessage: (message: string) => void;
}

export default function ChatInterface({ chats, onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <ScrollArea className="h-[calc(100%-4rem)] p-4">
        <CardContent className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${
                chat.isAi ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  chat.isAi
                    ? "bg-gray-100 text-gray-900"
                    : "bg-primary text-white"
                }`}
              >
                <p>{chat.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
