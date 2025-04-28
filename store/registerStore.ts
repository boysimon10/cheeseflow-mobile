import { create } from 'zustand';
import { CurrencyType } from '../constants/currencies';

interface RegisterState {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        selectedCurrency: CurrencyType | undefined;
        currencyDisplayText: string;
        isLoading: boolean;
        
        setName: (name: string) => void;
        setEmail: (email: string) => void;
        setPassword: (password: string) => void;
        setConfirmPassword: (confirmPassword: string) => void;
        setSelectedCurrency: (currency: CurrencyType) => void;
        setCurrencyDisplayText: (text: string) => void;
        setIsLoading: (isLoading: boolean) => void;
        resetForm: () => void;
    }

    export const useRegisterStore = create<RegisterState>((set) => ({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        selectedCurrency: undefined,
        currencyDisplayText: 'Select Currency',
        isLoading: false,
        
        setName: (name) => set({ name }),
        setEmail: (email) => set({ email }),
        setPassword: (password) => set({ password }),
        setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
        setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
        setCurrencyDisplayText: (text) => set({ currencyDisplayText: text }),
        setIsLoading: (isLoading) => set({ isLoading }),
        resetForm: () => set({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            selectedCurrency: undefined,
            currencyDisplayText: 'Select Currency',
            isLoading: false,
        }),
}));