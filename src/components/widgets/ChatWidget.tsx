
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; from: 'user' | 'bot' }>>([
    { text: 'Hello! How can I assist you today with finding your perfect vehicle?', from: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { translations } = useLanguage();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, from: 'user' }]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: translations.chat.autoResponse, 
          from: 'bot' 
        }
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg overflow-hidden">
          <div className="bg-dms-blue text-white p-3 flex justify-between items-center">
            <span className="font-semibold">{translations.chat.title}</span>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-dms-blue-dark rounded-full h-7 w-7 p-0">
              <X size={18} />
            </Button>
          </div>
          <div className="h-64 overflow-y-auto p-3 bg-white dark:bg-gray-800 flex flex-col gap-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-2 rounded-lg ${
                  message.from === 'user'
                    ? 'bg-dms-blue text-white self-end'
                    : 'bg-gray-100 dark:bg-gray-700 self-start'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2 bg-white dark:bg-gray-800">
            <Input
              placeholder={translations.chat.inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send size={18} />
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 p-0 shadow-lg bg-dms-blue hover:bg-dms-blue-dark"
          onClick={toggleChat}
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </>
  );
};

export default ChatWidget;
