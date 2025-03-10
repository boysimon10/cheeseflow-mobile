import React, { useState } from 'react';
import { Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { View, Text, Button, YStack, XStack, Input } from 'tamagui';
import { CurrencyDollarIcon, XMarkIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

export enum CurrencyType {
  EUR = 'EUR', // Euro
  USD = 'USD', // US Dollar
  XOF = 'XOF', // Franc CFA (UEMOA - Afrique de l'Ouest)
  XAF = 'XAF', // Franc CFA (CEMAC - Afrique Centrale)
  GBP = 'GBP', // British Pound Sterling
  JPY = 'JPY', // Japanese Yen
  CHF = 'CHF', // Swiss Franc
  CAD = 'CAD', // Canadian Dollar
  AUD = 'AUD', // Australian Dollar
  CNY = 'CNY', // Chinese Yuan
  HKD = 'HKD', // Hong Kong Dollar
  SGD = 'SGD', // Singapore Dollar
  INR = 'INR', // Indian Rupee
  RUB = 'RUB', // Russian Ruble
  BRL = 'BRL', // Brazilian Real
  ZAR = 'ZAR', // South African Rand
  NGN = 'NGN', // Nigerian Naira
  GHS = 'GHS', // Ghanaian Cedi
  KES = 'KES', // Kenyan Shilling
  MAD = 'MAD', // Moroccan Dirham
  EGP = 'EGP', // Egyptian Pound
  TND = 'TND', // Tunisian Dinar
  AED = 'AED', // UAE Dirham
  SAR = 'SAR', // Saudi Riyal
  MXN = 'MXN', // Mexican Peso
  KRW = 'KRW', // South Korean Won
  NZD = 'NZD', // New Zealand Dollar
  SEK = 'SEK', // Swedish Krona
  NOK = 'NOK', // Norwegian Krone
  DKK = 'DKK', // Danish Krone
}

// Currency descriptions for better user understanding
const currencyDescriptions = {
  [CurrencyType.EUR]: 'Euro',
  [CurrencyType.USD]: 'US Dollar',
  [CurrencyType.XOF]: 'CFA Franc BCEAO',
  [CurrencyType.XAF]: 'CFA Franc BEAC',
  [CurrencyType.GBP]: 'British Pound',
  [CurrencyType.JPY]: 'Japanese Yen',
  [CurrencyType.CHF]: 'Swiss Franc',
  [CurrencyType.CAD]: 'Canadian Dollar',
  [CurrencyType.AUD]: 'Australian Dollar',
  [CurrencyType.CNY]: 'Chinese Yuan',
  [CurrencyType.HKD]: 'Hong Kong Dollar',
  [CurrencyType.SGD]: 'Singapore Dollar',
  [CurrencyType.INR]: 'Indian Rupee',
  [CurrencyType.RUB]: 'Russian Ruble',
  [CurrencyType.BRL]: 'Brazilian Real',
  [CurrencyType.ZAR]: 'South African Rand',
  [CurrencyType.NGN]: 'Nigerian Naira',
  [CurrencyType.GHS]: 'Ghanaian Cedi',
  [CurrencyType.KES]: 'Kenyan Shilling',
  [CurrencyType.MAD]: 'Moroccan Dirham',
  [CurrencyType.EGP]: 'Egyptian Pound',
  [CurrencyType.TND]: 'Tunisian Dinar',
  [CurrencyType.AED]: 'UAE Dirham',
  [CurrencyType.SAR]: 'Saudi Riyal',
  [CurrencyType.MXN]: 'Mexican Peso',
  [CurrencyType.KRW]: 'South Korean Won',
  [CurrencyType.NZD]: 'New Zealand Dollar',
  [CurrencyType.SEK]: 'Swedish Krona',
  [CurrencyType.NOK]: 'Norwegian Krone',
  [CurrencyType.DKK]: 'Danish Krone',
};

// Currency symbols for display
const currencySymbols = {
  [CurrencyType.EUR]: '€',
  [CurrencyType.USD]: '$',
  [CurrencyType.XOF]: 'CFA',
  [CurrencyType.XAF]: 'FCFA',
  [CurrencyType.GBP]: '£',
  [CurrencyType.JPY]: '¥',
  [CurrencyType.CHF]: 'CHF',
  [CurrencyType.CAD]: 'C$',
  [CurrencyType.AUD]: 'A$',
  [CurrencyType.CNY]: '¥',
  [CurrencyType.HKD]: 'HK$',
  [CurrencyType.SGD]: 'S$',
  [CurrencyType.INR]: '₹',
  [CurrencyType.RUB]: '₽',
  [CurrencyType.BRL]: 'R$',
  [CurrencyType.ZAR]: 'R',
  [CurrencyType.NGN]: '₦',
  [CurrencyType.GHS]: 'GH₵',
  [CurrencyType.KES]: 'KSh',
  [CurrencyType.MAD]: 'د.م.',
  [CurrencyType.EGP]: 'E£',
  [CurrencyType.TND]: 'DT',
  [CurrencyType.AED]: 'د.إ',
  [CurrencyType.SAR]: '﷼',
  [CurrencyType.MXN]: 'Mex$',
  [CurrencyType.KRW]: '₩',
  [CurrencyType.NZD]: 'NZ$',
  [CurrencyType.SEK]: 'kr',
  [CurrencyType.NOK]: 'kr',
  [CurrencyType.DKK]: 'kr',
};

interface CurrencyModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (currency: CurrencyType) => void;
  selectedCurrency?: CurrencyType;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  selectedCurrency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const currencies = Object.values(CurrencyType);
  
  const filteredCurrencies = currencies.filter(currency => {
    const query = searchQuery.toLowerCase();
    return (
      currency.toLowerCase().includes(query) || 
      currencyDescriptions[currency].toLowerCase().includes(query)
    );
  });

  const renderCurrencyItem = ({ item }: { item: CurrencyType }) => {
    const isSelected = selectedCurrency === item;
    
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(item);
          onClose();
        }}
      >
        <XStack
          padding="$3"
          marginHorizontal="$2"
          marginBottom="$2"
          borderRadius="$4"
          backgroundColor={isSelected ? '#dde3fb' : 'white'}
          borderWidth={1}
          borderColor={isSelected ? '#4b61dc' : '#E2E8F0'}
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack alignItems="center" space="$2">
            <View 
              backgroundColor="#f2f2f2" 
              width={40} 
              height={40} 
              borderRadius={20} 
              alignItems="center" 
              justifyContent="center"
            >
              <Text fontSize={16}>{currencySymbols[item]}</Text>
            </View>
            <YStack>
              <Text fontSize={16} fontWeight="600">{item}</Text>
              <Text fontSize={14} color="#666">
                {currencyDescriptions[item]}
              </Text>
            </YStack>
          </XStack>
          
          {isSelected && (
            <View
              backgroundColor="#4b61dc"
              width={20}
              height={20}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontSize={10}>✓</Text>
            </View>
          )}
        </XStack>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        flex={1}
        backgroundColor="rgba(0, 0, 0, 0.5)"
        justifyContent="flex-end"
      >
        <View
          backgroundColor="white"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          padding="$4"
          height="80%"
        >
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
            <Text fontSize={20} fontWeight="bold">Select Currency</Text>
            <TouchableOpacity onPress={onClose}>
              <XMarkIcon size={24} color="#000" />
            </TouchableOpacity>
          </XStack>
          
          <View
            backgroundColor="#f5f5f5"
            borderRadius={10}
            marginBottom="$4"
            padding="$2"
            flexDirection="row"
            alignItems="center"
          >
            <MagnifyingGlassIcon size={20} color="#9CA3AF" />
            <Input
              flex={1}
              placeholder="Search currency"
              value={searchQuery}
              onChangeText={setSearchQuery}
              backgroundColor="transparent"
              borderWidth={0}
              paddingHorizontal="$2"
            />
          </View>
          
          <FlatList
            data={filteredCurrencies}
            renderItem={renderCurrencyItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};