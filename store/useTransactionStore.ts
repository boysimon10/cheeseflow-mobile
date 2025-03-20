import { create } from 'zustand';

type TransactionStore = {
  amount: string;
  description: string;
  type: 'EXPENSE' | 'INCOME';
  categoryId: number | null;
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  setType: (type: 'EXPENSE' | 'INCOME') => void;
  setCategoryId: (categoryId: number | null) => void;
  reset: () => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  amount: '',
  description: '',
  type: 'EXPENSE',
  categoryId: null,
  setAmount: (amount) => set({ amount }),
  setDescription: (description) => set({ description }),
  setType: (type) => set({ type }),
  setCategoryId: (categoryId) => set({ categoryId }),
  reset: () => set({ amount: '', description: '', type: 'EXPENSE', categoryId: null }),
}));