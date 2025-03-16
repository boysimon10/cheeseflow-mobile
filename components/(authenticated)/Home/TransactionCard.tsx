import { View, XStack, Text, YStack } from "tamagui"

export const TransactionCard = () => {
    return (
        <XStack
            backgroundColor={"#fff"}
            borderRadius={16}
            padding={"$4"}
            justifyContent="space-between"
            alignItems="center"
        >
            <XStack
            >
            <View
                width={35}
                height={35}
                backgroundColor="#dde3fb"
                borderRadius={8}
                alignItems="center"
                justifyContent="center"
            >
                <Text>
                🍔
                </Text>
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
                        Mon, Feb 12
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