import { Card, Separator, XStack, YStack, Text } from "tamagui"

export const SummaryCard = () => {
    return(
        <Card
            borderRadius={16}
            backgroundColor="white"
            marginVertical="$4"
        >
            <Card.Header paddingVertical="$3" paddingHorizontal="$4">
                <Text fontSize={18} fontWeight="600" color="#4b61dc">
                    Monthly Summary
                </Text>
            </Card.Header>
            <Separator />
            <Card.Footer padding="$4">
                <XStack width="100%" justifyContent="space-between">
                    <YStack alignItems="center" space="$1">
                        <Text fontSize={13} color="#666">
                            Expenses
                        </Text>
                        <Text fontSize={15} fontWeight="700" color="#F72585">
                            2350 XOF
                        </Text>
                    </YStack>
                    <YStack alignItems="center" space="$1">
                        <Text fontSize={13} color="#666">
                            Income
                        </Text>
                        <Text fontSize={15} fontWeight="700" color="#4CC9F0">
                            3800 XOF
                        </Text>
                    </YStack>
                    <YStack alignItems="center" space="$1">
                        <Text fontSize={13} color="#666">
                            Balance
                        </Text>
                        <Text fontSize={15} fontWeight="700" color="#4361EE">
                            10000 XOF
                        </Text>
                    </YStack>
                </XStack>
            </Card.Footer>
        </Card>
    )
}