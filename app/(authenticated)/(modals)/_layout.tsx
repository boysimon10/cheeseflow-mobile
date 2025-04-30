import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen name="NewTransaction" 
        options={{
          title: "New Transaction"
        }}
      />
      <Stack.Screen name="NewCategory" 
      options={{
        title: "New Category"
      }}
      />
    </Stack>
  );
}