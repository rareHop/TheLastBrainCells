import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types';

interface MessageState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id'>) => void;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) => {
        const newMessage = {
          ...message,
          id: Date.now().toString(),
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));

        // Store in localStorage for persistence
        const storedMessages = JSON.parse(localStorage.getItem('chat-messages') || '[]');
        localStorage.setItem('chat-messages', JSON.stringify([...storedMessages, newMessage]));
      },
    }),
    {
      name: 'chat-messages',
      getStorage: () => localStorage,
    }
  )
);