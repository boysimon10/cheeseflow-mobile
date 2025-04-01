import { gql } from '@apollo/client';

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