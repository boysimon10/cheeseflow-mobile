import { Card, Separator, XStack, YStack, Text, View, Spinner } from "tamagui"
import { ChartPieIcon } from "react-native-heroicons/outline"
import { PieChart } from "react-native-gifted-charts"
import { useState, useEffect } from "react"
import { ExpenseByCategory } from "~/apollo/types"
import { CHART_COLORS } from "~/constants/chart_colors"

interface PieChartDataItem {
    value: number
    color: string
    text: string
    label: string
}

interface ExpensesByCategoryCardProps {
    expensesByCategory?: ExpenseByCategory[];
    isLoading?: boolean;
}

export const ExpensesByCategoryCard = ({ expensesByCategory, isLoading = false }: ExpensesByCategoryCardProps) => {
    const [pieChartData, setPieChartData] = useState<PieChartDataItem[]>([])
    const [totalExpenses, setTotalExpenses] = useState(0)

    useEffect(() => {
        if (expensesByCategory && expensesByCategory.length > 0) {
            const total = expensesByCategory.reduce((sum, cat) => sum + cat.amount, 0)
            setTotalExpenses(total)

            const chartData = expensesByCategory.map((category, index) => {
                const percentage = total > 0 ? Math.round((category.amount / total) * 100) : 0
                return {
                    value: category.amount,
                    color: CHART_COLORS[index % CHART_COLORS.length],
                    text: `${percentage}%`,
                    label: category.categoryName,
                }
            })

            setPieChartData(chartData)
        } else {
            setPieChartData([])
            setTotalExpenses(0)
        }
    }, [expensesByCategory])

    return (
        <Card borderRadius={16} backgroundColor="white" marginBottom="$4">
            <Card.Header paddingVertical="$3" paddingHorizontal="$4">
                <XStack alignItems="center" space="$2">
                    <ChartPieIcon size={20} color="#4361EE" />
                    <Text fontSize={18} fontWeight="600" color="#333">
                        Expenses by Category
                    </Text>
                </XStack>
            </Card.Header>
            <Separator />
            <Card.Footer padding="$4">
                {isLoading ? (
                    <YStack height={200} justifyContent="center" alignItems="center">
                        <Spinner size="large" color="#4361EE" />
                    </YStack>
                ) : !expensesByCategory || expensesByCategory.length === 0 ? (
                    <YStack height={200} justifyContent="center" alignItems="center">
                        <Text color="#666">No expense data available</Text>
                    </YStack>
                ) : (
                    <YStack space="$4" alignItems="center" width="100%">
                        <PieChart
                            data={pieChartData}
                            donut
                            innerRadius={70}
                            innerCircleColor="#fff"
                            showText
                            textColor="white"
                            textSize={12}
                            centerLabelComponent={() => (
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333" }}>{totalExpenses}</Text>
                                    <Text style={{ fontSize: 14, color: "#666" }}>Total</Text>
                                </View>
                            )}
                        />

                        <YStack space="$2" width="100%" paddingTop="$4">
                            {pieChartData.map((item, index) => (
                                <XStack key={index} alignItems="center" space="$2">
                                    <View width={12} height={12} backgroundColor={item.color} borderRadius={4} />
                                    <Text color="#333">{item.label}</Text>
                                    <XStack marginLeft="auto" space="$2">
                                        <Text fontWeight="bold" color="#333">
                                            {item.value}
                                        </Text>
                                        <Text color="#666">({item.text})</Text>
                                    </XStack>
                                </XStack>
                            ))}
                        </YStack>
                    </YStack>
                )}
            </Card.Footer>
        </Card>
    )
}