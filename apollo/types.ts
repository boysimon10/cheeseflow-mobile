// Input types
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

// Response types
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

// Mutation response types
export type LoginResponse = {
    access_token: string;
    user: User;
}

// Query response types
export type GetProfileResponse = {
    profile: User;
}

export type GetBalanceResponse = {
    balance: number;
}

export type GetTransactionsResponse = {
    transactions: Transaction[];
}

// Mutation variables types
export type LoginMutationVariables = {
    loginInput: LoginUserInput;
}

export type CreateUserMutationVariables = {
    createUserInput: CreateUserInput;
}

// Query variables types
export type GetTransactionsQueryVariables = {
    filters?: TransactionFilterInput;
}