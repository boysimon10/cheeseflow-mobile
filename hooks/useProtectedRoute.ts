import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export const useProtectedRoute = () => {
    const router = useRouter();
    const segments = useSegments();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    useEffect(() => {
        const inAuthGroup = segments[0] === '(authenticated)';
        const isLoginPage = segments[0] === 'login';
        
        if (!isAuthenticated && inAuthGroup) {
            router.replace('/login');
        } else if (isAuthenticated && !inAuthGroup && !isLoginPage) {
            router.replace('/(authenticated)/(tabs)');
        }
    }, [isAuthenticated, segments]);
};