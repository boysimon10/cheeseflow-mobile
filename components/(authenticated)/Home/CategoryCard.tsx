import { View, YStack, Text } from "tamagui";

export const CategoryCard = () =>  {
  return (
    <YStack
    backgroundColor="#4b61dc"
    borderRadius={20}
    >
        <YStack
            margin={15}
        >
            <View
                width={35}
                height={35}
                borderRadius={100}
                backgroundColor={"#fff"}
            >
            </View>
            <YStack
            paddingTop={10}
            >
                <Text
                    fontSize={14}
                    fontWeight="400"
                    color="white"
                >
                    Nourritures
                </Text>
                <Text
                    fontSize={18}
                    fontWeight="700"
                    color="white"
                >
                    10000 F CFA
                </Text>
            </YStack>
        </YStack>
    </YStack>
)
}
