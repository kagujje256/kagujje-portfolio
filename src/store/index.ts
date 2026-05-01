import { create } from 'zustand';

interface ChatState {
  isOpen: boolean;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  isLoading: boolean;
  toggleChat: () => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (role, content) => set((state) => ({ 
    messages: [...state.messages, { role, content }] 
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));

interface CursorState {
  position: { x: number; y: number };
  isHovering: boolean;
  isClicking: boolean;
  setPosition: (x: number, y: number) => void;
  setHovering: (hovering: boolean) => void;
  setClicking: (clicking: boolean) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  position: { x: 0, y: 0 },
  isHovering: false,
  isClicking: false,
  setPosition: (x, y) => set({ position: { x, y } }),
  setHovering: (hovering) => set({ isHovering: hovering }),
  setClicking: (clicking) => set({ isClicking: clicking }),
}));
