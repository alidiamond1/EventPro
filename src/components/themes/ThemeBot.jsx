import { useState, useEffect, useRef } from 'react';
import { generateThemeSuggestion, generateFollowUpQuestion } from '../../utils/themeData';

const Message = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isUser
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
      }`}
    >
      {message}
    </div>
  </div>
);

const ColorScheme = ({ colors }) => (
  <div className="flex flex-wrap gap-2 my-2">
    {colors.map((color, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className="flex space-x-1">
          <div
            className="w-8 h-8 rounded-full border border-gray-200"
            style={{ backgroundColor: color.primary }}
            title="Primary"
          />
          <div
            className="w-8 h-8 rounded-full border border-gray-200"
            style={{ backgroundColor: color.secondary }}
            title="Secondary"
          />
          <div
            className="w-8 h-8 rounded-full border border-gray-200"
            style={{ backgroundColor: color.accent }}
            title="Accent"
          />
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {color.name}
        </span>
      </div>
    ))}
  </div>
);

const DecorationList = ({ decorations }) => (
  <div className="grid grid-cols-2 gap-2 my-2">
    {decorations.map((decoration, index) => (
      <div
        key={index}
        className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2 rounded"
      >
        • {decoration}
      </div>
    ))}
  </div>
);

const ThemeSuggestion = ({ suggestion }) => {
  if (!suggestion) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 my-2 shadow-sm">
      <h4 className="font-semibold mb-2">Suggested Color Schemes:</h4>
      <ColorScheme colors={suggestion.colors} />
      
      <h4 className="font-semibold mt-4 mb-2">Recommended Decorations:</h4>
      <DecorationList decorations={suggestion.decorations} />
    </div>
  );
};

const ThemeBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('themeBotMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const initialMessage = {
        text: "Hello! I'm your AI Theme Assistant. Tell me about the type of event you're planning, and I'll help you choose the perfect theme and decorations.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages([initialMessage]);
      localStorage.setItem('themeBotMessages', JSON.stringify([initialMessage]));
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('themeBotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    simulateTyping(() => {
      const response = generateThemeSuggestion(input);
      const botMessage = {
        text: response.message,
        isUser: false,
        timestamp: new Date().toISOString(),
        suggestion: response.suggestions,
      };

      setMessages(prev => [...prev, botMessage]);

      if (response.suggestions) {
        simulateTyping(() => {
          const followUp = {
            text: generateFollowUpQuestion(response.suggestions.theme),
            isUser: false,
            timestamp: new Date().toISOString(),
          };
          setMessages(prev => [...prev, followUp]);
        });
      }
    });
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      const initialMessage = {
        text: "Hello! I'm your AI Theme Assistant. Tell me about the type of event you're planning, and I'll help you choose the perfect theme and decorations.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages([initialMessage]);
      localStorage.setItem('themeBotMessages', JSON.stringify([initialMessage]));
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🎨</span>
          <div>
            <h3 className="font-semibold">Theme Assistant</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered theme suggestions
            </p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Clear Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={message.timestamp}>
            <Message message={message.text} isUser={message.isUser} />
            {message.suggestion && (
              <ThemeSuggestion suggestion={message.suggestion} />
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your event..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThemeBot;