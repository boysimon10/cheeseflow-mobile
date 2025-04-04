// Input Types
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

export type CreateCategoryInput = {
    name: string;
    emoji: string;
    type: TransactionType;
}

export type CreateTransactionInput = {
    amount: number;
    description: string;
    type: TransactionType;
    categoryId: number;
    date?: string;
}

export type TransactionFilterInput = {
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
    limit?: number;
    offset?: number;
}

// Enum Types
export enum TransactionType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME'
}

export enum CurrencyType {
    XOF = 'XOF',
    EUR = 'EUR',
    USD = 'USD',
    GBP = 'GBP',
    AED = 'AED',
    AUD = 'AUD',
    BRL = 'BRL',
    CAD = 'CAD',
    CHF = 'CHF',
    CNY = 'CNY',
    DKK = 'DKK',
    EGP = 'EGP',
    GHS = 'GHS',
    HKD = 'HKD',
    INR = 'INR',
    JPY = 'JPY',
    KES = 'KES',
    KRW = 'KRW',
    MAD = 'MAD',
    MXN = 'MXN',
    NGN = 'NGN',
    NOK = 'NOK',
    NZD = 'NZD',
    RUB = 'RUB',
    SAR = 'SAR',
    SEK = 'SEK',
    SGD = 'SGD',
    TND = 'TND',
    XAF = 'XAF',
    ZAR = 'ZAR'
}

// Model Types
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

export type ExpenseByCategory = {
    categoryId: string;
    categoryName: string;
    amount: number;
}

export type MonthHistory = {
    month: string;
    expenses: number;
    incomes: number;
    balance: number;
}

// Response Types
export type LoginResponse = {
    access_token: string;
    user: User;
}

export type GetProfileResponse = {
    profile: User;
}

export type GetCategoriesResponse = {
    categories: Category[];
}

export type GetCategoryResponse = {
    category: Category;
}

export type GetTransactionsResponse = {
    transactions: Transaction[];
}

export type GetTransactionResponse = {
    transaction: Transaction;
}

export type GetBalanceResponse = {
    balance: number;
}

export type GetMonthlyExpensesResponse = {
    monthlyExpenses: number;
}

export type GetMonthlyIncomesResponse = {
    monthlyIncomes: number;
}

export type GetExpensesByCategoryResponse = {
    expensesByCategory: ExpenseByCategory[];
}

export type GetMonthlyHistoryResponse = {
    monthlyHistory: MonthHistory[];
}

export type GetCurrentMonthHistoryResponse = {
    currentMonthHistory: MonthHistory;
}

// Variables Types
export type LoginMutationVariables = {
    loginInput: LoginUserInput;
}

export type CreateUserMutationVariables = {
    createUserInput: CreateUserInput;
}

export type CreateCategoryMutationVariables = {
    createCategoryInput: CreateCategoryInput;
}

export type UpdateCategoryMutationVariables = {
    id: number;
    updateCategoryInput: CreateCategoryInput;
}

export type RemoveCategoryMutationVariables = {
    id: number;
}

export type CreateTransactionMutationVariables = {
    createTransactionInput: CreateTransactionInput;
}

export type UpdateTransactionMutationVariables = {
    id: number;
    createTransactionInput: CreateTransactionInput;
}

export type DeleteTransactionMutationVariables = {
    id: number;
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