export type LoginUserInput = {
    email: string;
    password: string;
}

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    currency?: string;
}

export type TransactionFilterInput = {
    startDate?: string;
    endDate?: string;
    type?: string;
    categoryId?: string;
    limit?: number;
}


export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    currency: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Category = {
    id: string;
    name: string;
    emoji: string;
    type: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Transaction = {
    id: string;
    amount: number;
    description: string;
    type: string;
    categoryId: string;
    userId: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export type LoginResponse = {
    access_token: string;
    user: User;
}


export type GetProfileResponse = {
    profile: User;
}

export type GetBalanceResponse = {
    balance: number;
}

export type GetTransactionsResponse = {
    transactions: Transaction[];
}

export type GetCategoryResponse = {
    category: Category;
}

export type GetTransactionResponse = {
    transaction: Transaction;
}


export type LoginMutationVariables = {
    loginInput: LoginUserInput;
}

export type CreateUserMutationVariables = {
    createUserInput: CreateUserInput;
}


export type GetTransactionsQueryVariables = {
    filters?: TransactionFilterInput;
}

export type GetCategoryQueryVariables = {
    id: number;
}

export type GetTransactionQueryVariables = {
    id: number;
}


export type GetCategoriesResponse = {
    categories: Category[];
}

export type GetMonthlyExpensesResponse = {
    monthlyExpenses: number;
}

export type GetMonthlyIncomesResponse = {
    monthlyIncomes: number;
}

export type ExpenseByCategory = {
    categoryId: string;
    categoryName: string;
    amount: number;
}

export type GetExpensesByCategoryResponse = {
    expensesByCategory: ExpenseByCategory[];
}

export type MonthHistory = {
    month: string;
    expenses: number;
    incomes: number;
    balance: number;
}

export type GetCurrentMonthHistoryResponse = {
    currentMonthHistory: MonthHistory;
}