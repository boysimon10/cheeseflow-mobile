import { ComponentProps, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { TamaguiElement } from 'tamagui';

import { Input as TInput } from '../tamagui.config';

type InputProps = ComponentProps<typeof TInput>;

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  return <TInput {...props} ref={ref} />;
});