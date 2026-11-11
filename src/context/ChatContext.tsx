import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isTyping: boolean;
  clearChat: () => void;
  isWidgetOpen: boolean;
  setIsWidgetOpen: (open: boolean) => void;
  isListening: boolean;
  toggleListening: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Namaste. I am Maya, your somatic wellness and mental health companion. How does your mind and nervous system feel right now?",
    timestamp: '10:00 AM',
    suggestions: [
      'Feeling anxious & overwhelmed',
      'Need a quick 4-7-8 breathing exercise',
      'Recommend an evening yoga pose for sleep',
      'Check in on my mood'
    ],
  },
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('mw_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading chat history', e);
      }
    }
    return INITIAL_MESSAGES;
  });

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('mw_chat_messages', JSON.stringify(messages));
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate speech recognition capture
      setTimeout(() => {
        setIsListening(false);
        sendMessage("I feel a tight weight in my chest and need guidance calming down.");
      }, 3500);
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('mw_chat_messages');
  };

  const generateMayaResponse = (userText: string): { text: string; suggestions?: string[]; isCrisisAlert?: boolean; yogaRecommendation?: string } => {
    const lower = userText.toLowerCase();

    // Crisis detection
    if (
      lower.includes('suicide') ||
      lower.includes('kill myself') ||
      lower.includes('end my life') ||
      lower.includes('want to die') ||
      lower.includes('harm myself')
    ) {
      return {
        text: "I hear how much pain you are holding right now, and I want you to be safe. Please know you are not alone and immediate compassionate human support is standing by right this second.\n\n• Dial or text 988 (Suicide & Crisis Lifeline - Free, 24/7, Confidential)\n• Text HOME to 741741 (Crisis Text Line)\n• If you are in immediate physical danger, please dial 911 or visit your nearest emergency room.",
        isCrisisAlert: true,
        suggestions: ['Connect to 988 Lifeline', 'Talk to a human specialist', 'Try grounding breathwork'],
      };
    }

    // Breathing or panic
    if (lower.includes('breath') || lower.includes('panic') || lower.includes('chest') || lower.includes('anxious') || lower.includes('overwhelmed')) {
      return {
        text: "Let's regulate your vagus nerve together right now with a 4-7-8 Somatic Calming cycle.\n\n1. Inhale gently through your nose for 4 seconds.\n2. Hold your breath softly for 7 seconds without straining.\n3. Exhale fully through parted lips for 8 seconds with a gentle whoosh sound.\n\nNotice the sensation of your feet resting firmly against the floor. Your nervous system is safe in this present moment.",
        suggestions: ['Start 3-minute guided Balasana', 'Log this feeling in my tracker', 'Tell me more about vagal regulation'],
        yogaRecommendation: 'balasana',
      };
    }

    // Sleep
    if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('tired') || lower.includes('bed')) {
      return {
        text: "Restorative sleep begins with releasing excess sympathetic adrenaline. I recommend Viparita Karani (Legs-Up-The-Wall Pose) for 5 minutes before sleep. It cools your core body temperature and signals melatonin release.",
        suggestions: ['Open Legs-Up-The-Wall guide', 'Guide me through bedtime breathing', 'How does sleep affect serotonin?'],
        yogaRecommendation: 'viparita-karani',
      };
    }

    // Yoga / somatic
    if (lower.includes('yoga') || lower.includes('pose') || lower.includes('stretch') || lower.includes('somatic')) {
      return {
        text: "Somatic postures aren't about contortion or athletic performance—they are neuro-biological invitations to discharge trapped stress from your fascia and psoas. Would you like a grounding restorative session or an energizing spinal mobilization flow?",
        suggestions: ['Explore Yoga Sanctuary', 'Cat-Cow spinal flow', 'Tree Pose for focus'],
        yogaRecommendation: 'marjaryasana-bitilasana',
      };
    }

    // Default supportive therapeutic dialogue
    return {
      text: "Thank you for sharing that with me. Acknowledging your emotional state without judgment is the foundation of neuro-somatic healing. What kind of care would feel most nourishing to you right now?",
      suggestions: [
        'Explore somatic yoga poses',
        'Check my 7-day wellness trends',
        'Schedule consultation with a specialist',
        'Learn about 4-7-8 breathwork'
      ],
    };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: time,
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate intelligent response delay
    setTimeout(() => {
      const responseData = generateMayaResponse(text);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...responseData,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isTyping,
        clearChat,
        isWidgetOpen,
        setIsWidgetOpen,
        isListening,
        toggleListening,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

