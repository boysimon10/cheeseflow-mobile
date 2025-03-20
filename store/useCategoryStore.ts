import { create } from 'zustand';

type CategoryStore = {
    name: string;
    emoji: string;
    type: 'EXPENSE' | 'INCOME';
    setName: (name: string) => void;
    setEmoji: (emoji: string) => void;
    setType: (type: 'EXPENSE' | 'INCOME') => void;
    reset: () => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  name: '',
  emoji: '',
  type: 'EXPENSE',
  setName: (name) => set({ name }),
  setEmoji: (emoji) => set({ emoji }),
  setType: (type) => set({ type }),
  reset: () => set({ name: '', emoji: '', type: 'EXPENSE' }),
}));