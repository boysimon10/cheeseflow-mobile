import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { client } from '../apollo/client';

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
    tokenExpiration: number | null;
    login: (token: string, user: User) => void;
    updateUserProfile: (user: User) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            tokenExpiration: null,
            
            login: (token, user) => {
                const expirationDate = Date.now() + (30 * 24 * 60 * 60 * 1000);
                
                set({ 
                    token, 
                    user,
                    isAuthenticated: true,
                    tokenExpiration: expirationDate
                });
            },
            
            updateUserProfile: (user) => set((state) => ({
                user: { ...state.user, ...user }
            })),
            
            logout: async () => {
                //await client.resetStore();
                await client.clearStore();
                
                await AsyncStorage.removeItem('auth_token');
                set({ 
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    tokenExpiration: null
                });
                router.replace('/login');
            },

            checkAuth: async () => {
                const token = await AsyncStorage.getItem('auth_token');
                const state = get();
                
                if (token && state.tokenExpiration) {
                    if (Date.now() < state.tokenExpiration) {
                        set({ token, isAuthenticated: true });
                    } else {
                        get().logout();
                    }
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
