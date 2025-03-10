import { YStack } from 'tamagui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={75}
    >
    <YStack flex={1} >
      {children}
    </YStack>
    </KeyboardAwareScrollView>
  );
};
