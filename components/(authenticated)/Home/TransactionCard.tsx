import { View, XStack, Text, YStack } from "tamagui";
import * as Haptics from 'expo-haptics';
import { TouchableOpacity } from 'react-native';

export const TransactionCard = ({
  category = "Hamburger",
  emoji = "🍔",
  date = "Mon, Feb 12",
  description = "",
  amount = "10000",
  currency = "XOF",
  type = "EXPENSE",
  
}) => {

  const isExpense = type === "EXPENSE";
  const amountColor = isExpense ? "#dc4b4b" : "#4bdc7d";
  const backgroundIconColor = isExpense ? "#ffeded" : "#e3fff0";
  
  return (
    <TouchableOpacity 
      onPress={() => {
        Haptics.selectionAsync();
      }}

    >
      <XStack
        backgroundColor={"#fff"}
        borderRadius={12}
        padding={"$4"}
        justifyContent="space-between"
        alignItems="center"
      >
        <XStack alignItems="center" space="$3">
          <View
            padding="$2"
            backgroundColor={backgroundIconColor}
            borderRadius={8}
            alignItems="center"
            justifyContent="center"
            width={40}
            height={40}
          >
            <Text fontSize={18}>
              {emoji}
            </Text>
          </View>
          
          <YStack>
            <Text
              fontSize={16}
              fontWeight="500"
              color="#333"
            >
              {category}
            </Text>
            
            {description ? (
              <Text
                fontSize={14}
                color="#666"
              >
                {description}
              </Text>
            ) : null}
            
            <Text
              fontSize={12}
              color="#999"
              marginTop={2}
            >
              {date}
            </Text>
          </YStack>
        </XStack>
        
        <Text
          fontSize={16}
          fontWeight="600"
          color={amountColor}
        >
          {isExpense ? "-" : "+"}{amount} {currency}
        </Text>
      </XStack>
    </TouchableOpacity>
  );
};