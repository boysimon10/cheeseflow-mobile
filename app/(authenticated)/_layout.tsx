import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ 
        headerShown: false, 
        presentation: "modal",
        animation: "slide_from_bottom",
        contentStyle: { backgroundColor: 'white' }}}/>
        <Stack.Screen name="transaction/[id]" options={{ headerShown: false }}  />
    </Stack>
  );
}