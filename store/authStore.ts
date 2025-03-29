import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface User {
    id: string;
    name: string;
    email: string;
    currency: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            
            login: (token, user) => set({ 
                token, 
                user,
                isAuthenticated: true 
            }),
            
            logout: async () => {
                await AsyncStorage.removeItem('auth_token');
                set({ 
                    token: null,
                    user: null,
                    isAuthenticated: false 
                });
                router.replace('/login');
            },

            checkAuth: async () => {
                const token = await AsyncStorage.getItem('auth_token');
                if (token) {
                    set({ token, isAuthenticated: true });
                }
            }
        }),
        {
            name: 'auth-storage',
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name, value) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);
