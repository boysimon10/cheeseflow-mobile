import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { 
  ArrowLongLeftIcon,
  CurrencyDollarIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon
} from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CurrencyBottomSheet from '~/components/Register/CurrencyBottomSheet';
import { useRef, useState } from 'react';
import { CurrencyType, currencyDescriptions, currencySymbols } from '../../constants/currencies';


export const ScreenContent = () => {
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType | undefined>(undefined);
  const [currencyDisplayText, setCurrencyDisplayText] = useState('Select Currency');
  
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present(); 
  };
  
  const handleClosePress = () => bottomSheetRef.current?.dismiss();
  
  const handleSelectCurrency = (currency: CurrencyType) => {
    setSelectedCurrency(currency);
    setCurrencyDisplayText(`${currency} - ${currencyDescriptions[currency]}`);
  };

  return (
    <Theme name="light">
      <YStack flex={1} padding="$4">
        <YStack
          flex={1}
          paddingTop={top}
          alignItems="center"
          justifyContent="center"
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#dde3fb',
              padding: 12,
              borderRadius: 1000,
              alignSelf: 'flex-start'
            }}
            onPress={() => router.back()}
          >
            <ArrowLongLeftIcon size={25} color="#4b61dc" />
          </TouchableOpacity>

          <View
            flex={1}
            width={"100%"}
            padding={"$4"}
            borderRadius={"$10"}
            backgroundColor={'#dde3fb'}
            marginTop={"$2"}
            
          >
            <Text
              fontSize={32}
              fontWeight={"bold"}
              textAlign={"center"}
              marginBottom={"$2"}
              color={"#4b61dc"}
            >
              Create Account
            </Text>
            <Text
              fontSize={16}
              textAlign={"center"}
              marginBottom={"$4"}
              color={"#666"}
            >
              Sign up to get started
            </Text>
            
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              autoCorrect={false}
              icon={<UserIcon size={20} color="#9CA3AF" />}
            />
            
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon={<EnvelopeIcon size={20} color="#9CA3AF" />}
            />
            
            {/* Currency Selector */}
            <Input
              placeholder={currencyDisplayText}
              autoCapitalize="none"
              autoCorrect={false}
              icon={<CurrencyDollarIcon size={20} color="#9CA3AF" />}
              onPress={() => handleOpenBottomSheet()}
              editable={false}
              value={currencyDisplayText !== "Select Currency" ? currencyDisplayText : ""}
            />
            
            <Input
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              icon={<LockClosedIcon size={20} color="#9CA3AF" />}
            />
            
            <Input
              placeholder="Confirm Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              icon={<KeyIcon size={20} color="#9CA3AF" />}
            />
            
            <Link href={{ pathname: '/'}} asChild>
              <Button title="Register" marginBottom={"$4"}/>
            </Link>
            
            <View paddingBottom={"$4"}>
              <Link href={{ pathname: '/' }} asChild>
                <Text color={"#4b61dc"} textAlign='center'>
                  Already have an account? Sign in
                </Text>
              </Link>
            </View>
          </View>
        </YStack>
      </YStack>
      <CurrencyBottomSheet 
        ref={bottomSheetRef} 
        onClose={handleClosePress}
        onSelect={handleSelectCurrency}
        selectedCurrency={selectedCurrency}
      />
    </Theme>
  );
};