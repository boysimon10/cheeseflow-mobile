import { create } from 'zustand';

type FilterType = 'ALL' | 'INCOME' | 'EXPENSE';

interface FilterState {
    transactionFilter: FilterType;
    categoryFilter: FilterType;
    setTransactionFilter: (filter: FilterType) => void;
    setCategoryFilter: (filter: FilterType) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    transactionFilter: 'ALL',
    categoryFilter: 'ALL',
    setTransactionFilter: (filter) => set({ transactionFilter: filter }),
    setCategoryFilter: (filter) => set({ categoryFilter: filter }),
}));