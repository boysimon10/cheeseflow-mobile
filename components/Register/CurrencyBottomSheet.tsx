import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { FlatList } from 'react-native-gesture-handler';
import { 
  View, 
  Text, 
  Input, 
  XStack, 
  YStack, 
  Stack, 
  Circle,
  styled,
  Theme
} from 'tamagui';
import { CurrencyType, currencyDescriptions, currencySymbols } from '../../constants/currencies';


interface CurrencyBottomSheetProps {
  onClose?: () => void;
  onSelect?: (currency: CurrencyType) => void;
  selectedCurrency?: CurrencyType;
}

const HandleBar = styled(View, {
  width: 40,
  height: 4,
  backgroundColor: "#dde3fb",
  borderRadius: 2,
});

const CurrencySymbolCircle = styled(Circle, {
  size: 40,
  backgroundColor: "#dde3fb",
});

const CheckmarkCircle = styled(Circle, {
  size: 20,
  backgroundColor: "#4b61dc",
});

const TitleText = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
  color: "#4b61dc",
});

const CurrencyBottomSheet = forwardRef<BottomSheetModal, CurrencyBottomSheetProps>(
  ({ onClose, onSelect, selectedCurrency }, ref) => {
    const snapPoints = useMemo(() => ['75%'], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.65}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    const currencies = Object.values(CurrencyType);
    

    const handleSelectCurrency = useCallback((currency: CurrencyType) => {
      if (onSelect) {
        onSelect(currency);
      }
      if (onClose) {
        onClose();
      }
      if (ref && 'current' in ref && ref.current) {
        ref.current.dismiss();
      }
    }, [onSelect, onClose, ref]);

    const renderCurrencyItem = useCallback(({ item }: { item: CurrencyType }) => {
      const isSelected = selectedCurrency === item;
      
      return (
        <TouchableOpacity
          onPress={() => handleSelectCurrency(item)}
          style={{ paddingHorizontal: 4, marginBottom: 8 }}
        >
          <XStack
            borderWidth={1}
            borderColor={isSelected ? "#4b61dc" : "#E5E7EB"}
            backgroundColor={isSelected ? "#dde3fb" : "white"}
            borderRadius={12}
            paddingVertical={12}
            paddingHorizontal={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <XStack alignItems="center" space={8}>
              <CurrencySymbolCircle alignItems="center" justifyContent="center">
                <Text fontSize={12} color="#4b61dc" fontWeight="500">{currencySymbols[item]}</Text>
              </CurrencySymbolCircle>
              
              <YStack>
                <Text fontWeight="600" fontSize={16} color="#333">{item}</Text>
                <Text fontSize={14} color="#666">
                  {currencyDescriptions[item]}
                </Text>
              </YStack>
            </XStack>
            
            {isSelected && (
              <CheckmarkCircle alignItems="center" justifyContent="center">
                <Text fontSize={15} color="white">✓</Text>
              </CheckmarkCircle>
            )}
          </XStack>
        </TouchableOpacity>
      );
    }, [selectedCurrency, handleSelectCurrency]);

    return (
      <Theme name="light">
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={false}
          enableOverDrag={false}
          enablePanDownToClose={true}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: "#FFFFFF" }}
        >
          <BottomSheetView style={{ flex: 1, paddingBottom: 100 }}>
            <YStack paddingHorizontal={24} flex={1} paddingTop={8}>
              <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
                <TitleText>Select Currency</TitleText>
                <TouchableOpacity 
                  onPress={onClose}
                  style={{ 
                    padding: 8, 
                    borderRadius: 20, 
                    backgroundColor: "#dde3fb" 
                  }}
                >
                  <XMarkIcon size={24} color="#4b61dc" />
                </TouchableOpacity>
              </XStack>
              
              <FlatList
                data={currencies}
                renderItem={renderCurrencyItem}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 100,
              }}
              />
            </YStack>
          </BottomSheetView>
        </BottomSheetModal>
      </Theme>
    );
  }
);

export default CurrencyBottomSheet;