import { View, XStack, Text, YStack } from "tamagui"

export const TransactionCard = () => {
    return (
        <XStack
            backgroundColor={"#dde3fb"}
            borderRadius={12}
            padding={"$3"}
            justifyContent="space-between"
            alignItems="center"
        >
            <XStack
            >
            <View
                width={35}
                height={35}
                borderRadius={100}
                backgroundColor={"#fff"}
            >
            </View>
                <YStack
                paddingLeft={"$2"}
                >
                    <Text
                        fontSize={16}
                        fontWeight={"bold"}
                        color={"#4b61dc"}
                    >
                        Hamburger
                    </Text>
                    <Text
                        fontSize={12}
                        color={"#4b61dc"}
                    >
                        12/02/2025
                    </Text>
                </YStack>
            </XStack>
            <Text
                fontSize={16}
                color={"#DE507B"}
            >
                -10000 XOF
            </Text>
        </XStack>
    )
}