import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen name="NewTransaction" 
        options={{
          title: "New Transaction",
          headerShown: false 
        }}
      />
      <Stack.Screen name="NewCategory" 
      options={{
        title: "New Category",
        headerShown: false 
      }}
      />
    </Stack>
  );
}