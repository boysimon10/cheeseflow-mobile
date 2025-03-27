import { Card, Separator, XStack, YStack, Text, View } from "tamagui"
import { ChartPieIcon } from "react-native-heroicons/outline"
import { PieChart } from "react-native-gifted-charts"
import { useState, useEffect } from "react"

interface PieChartDataItem {
    value: number
    color: string
    text: string
    label: string
}

export const ExpensesByCategoryCard = () => {
    const COLORS = [
        "#4361EE",
        "#3A0CA3",
        "#7209B7",
        "#F72585",
        "#4CC9F0",
        "#480CA8",
        "#560BAD",
        "#B5179E",
        "#F25C54",
        "#F7B267",
    ]

    const MOCK_DATA = {
        expensesByCategory: [
            { categoryId: "1", categoryName: "Rent", amount: 1850 },
            { categoryId: "2", categoryName: "Food", amount: 450 },
            { categoryId: "3", categoryName: "Transport", amount: 200 },
            { categoryId: "4", categoryName: "Entertainment", amount: 350 },
            { categoryId: "5", categoryName: "Health", amount: 120 },
            { categoryId: "6", categoryName: "Others", amount: 380 },
        ],
    }

    const [pieChartData, setPieChartData] = useState<PieChartDataItem[]>([])
    const [totalExpenses, setTotalExpenses] = useState(0)

    useEffect(() => {
        const categories = MOCK_DATA.expensesByCategory
        const total = categories.reduce((sum, cat) => sum + cat.amount, 0)
        setTotalExpenses(total)

        const chartData = categories.map((category, index) => {
            const percentage = total > 0 ? Math.round((category.amount / total) * 100) : 0
            return {
                value: category.amount,
                color: COLORS[index % COLORS.length],
                text: `${percentage}%`,
                label: category.categoryName,
            }
        })

        setPieChartData(chartData)
    }, [])

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
                {pieChartData.length > 0 ? (
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
                                    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333" }}>{totalExpenses}€</Text>
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
                ) : (
                    <YStack height={200} justifyContent="center" alignItems="center">
                        <Text color="#666">Loading data...</Text>
                    </YStack>
                )}
            </Card.Footer>
        </Card>
    )
}