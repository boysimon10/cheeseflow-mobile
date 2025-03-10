import { ComponentProps, forwardRef, ReactNode } from 'react';
import { TextInput } from 'react-native';
import { View } from 'tamagui';

import { Input as TInput } from '../tamagui.config';

type InputProps = ComponentProps<typeof TInput> & {
  icon?: ReactNode;
};

export const Input = forwardRef<TextInput, InputProps>(({ icon, ...props }, ref) => {
  return (
    <View position="relative">
      {icon && (
        <View 
          position="absolute" 
          left={16} 
          top={0}
          bottom={16}
          zIndex={1}
          justifyContent="center"
        >
          {icon}
        </View>
      )}
      <TInput 
        {...props} 
        ref={ref} 
        paddingLeft={icon ? 45 : 16}
      />
    </View>
  );
});