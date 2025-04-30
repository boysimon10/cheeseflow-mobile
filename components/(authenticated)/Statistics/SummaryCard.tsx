import { Card, Separator, XStack, YStack, Text, Spinner } from "tamagui"
import { ChartBarIcon } from "react-native-heroicons/outline"

interface SummaryCardProps {
    monthlyExpenses?: number;
    monthlyIncomes?: number;
    balance?: number;
    isLoading?: boolean;
}

export const SummaryCard = ({ monthlyExpenses, monthlyIncomes, balance, isLoading = false }: SummaryCardProps) => {
    const dataIsLoading = isLoading || monthlyExpenses === undefined || monthlyIncomes === undefined || balance === undefined;

    return(
        <Card
            borderRadius={16}
            backgroundColor="white"
            marginVertical="$4"
        >
            <Card.Header paddingVertical="$3" paddingHorizontal="$4">
                <XStack alignItems="center" space="$2">
                    <ChartBarIcon size={20} color="#4361EE" />
                    <Text fontSize={18} fontWeight="600" color="#333">
                        Current Month Summary
                    </Text>
                </XStack>
            </Card.Header>
            <Separator />
            <Card.Footer padding="$4">
                {dataIsLoading ? (
                    <YStack height={50} justifyContent="center" alignItems="center" width="100%">
                        <Spinner size="small" color="#4b61dc" />
                    </YStack>
                ) : (
                    <XStack width="100%" justifyContent="space-between">
                        <YStack alignItems="center" space="$1">
                            <Text fontSize={13} color="#666">
                                Expenses
                            </Text>
                            <Text fontSize={15} fontWeight="700" color="#dc4b4b">
                                {monthlyExpenses} XOF
                            </Text>
                        </YStack>
                        <YStack alignItems="center" space="$1">
                            <Text fontSize={13} color="#666">
                                Incomes
                            </Text>
                            <Text fontSize={15} fontWeight="700" color="#4bdc7d">
                                {monthlyIncomes} XOF
                            </Text>
                        </YStack>
                        <YStack alignItems="center" space="$1">
                            <Text fontSize={13} color="#666">
                                Balance
                            </Text>
                            <Text fontSize={15} fontWeight="700" color="#4361EE">
                                {balance} XOF
                            </Text>
                        </YStack>
                    </XStack>
                )}
            </Card.Footer>
        </Card>
    )
}