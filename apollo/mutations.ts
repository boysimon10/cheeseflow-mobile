import { gql } from '@apollo/client';

// Authentication
export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput) {
      access_token,
      user{
        id
        name
        email
        currency
        }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      phone
      currency
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROFILE_QUERY = gql`
  query GetProfile {
    profile {
      id
      name
      email
      phone
      currency
      createdAt
      updatedAt
    }
  }
`;

// Categories
export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      emoji
      type
      userId
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY_QUERY = gql`
  query GetCategory($id: Float!) {
    category(id: $id) {
      id
      name
      emoji
      type
      userId
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      emoji
      type
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: Float!, $updateCategoryInput: CreateCategoryInput!) {
    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
      id
      name
      emoji
      type
    }
  }
`;

export const REMOVE_CATEGORY_MUTATION = gql`
  mutation RemoveCategory($id: Float!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

// Transactions
export const GET_TRANSACTIONS_QUERY = gql`
  query GetTransactions($filters: TransactionFilterInput) {
    transactions(filters: $filters) {
      id
      amount
      description
      type
      categoryId
      userId
      date
      createdAt
      updatedAt
      category {
        id
        name
        emoji
        type
      }
    }
  }
`;

export const GET_TRANSACTION_QUERY = gql`
  query GetTransaction($id: Float!) {
    transaction(id: $id) {
      id
      amount
      description
      type
      categoryId
      userId
      date
      createdAt
      updatedAt
      category {
        id
        name
        emoji
        type
      }
    }
  }
`;

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      id
      amount
      description
      date
      type
      categoryId
    }
  }
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: Float!, $createTransactionInput: CreateTransactionInput!) {
    updateTransaction(id: $id, createTransactionInput: $createTransactionInput) {
      id
      amount
      description
      type
      categoryId
    }
  }
`;

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: Float!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;

// Statistics
export const GET_BALANCE_QUERY = gql`
  query GetBalance {
    balance
  }
`;

export const GET_MONTHLY_EXPENSES_QUERY = gql`
  query GetMonthlyExpenses {
    monthlyExpenses
  }
`;

export const GET_MONTHLY_INCOMES_QUERY = gql`
  query GetMonthlyIncomes {
    monthlyIncomes
  }
`;

export const GET_EXPENSES_BY_CATEGORY_QUERY = gql`
  query GetExpensesByCategory {
    expensesByCategory {
      categoryId
      categoryName
      amount
    }
  }
`;

export const GET_MONTHLY_HISTORY_QUERY = gql`
  query GetMonthlyHistory {
    monthlyHistory {
      month
      expenses
      incomes
      balance
    }
  }
`;

export const GET_CURRENT_MONTH_HISTORY_QUERY = gql`
  query GetCurrentMonthHistory {
    currentMonthHistory {
      month
      expenses
      incomes
      balance
    }
  }
`;