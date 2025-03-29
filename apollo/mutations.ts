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

export const GET_BALANCE_QUERY =gql `
  query GetBalance {
    balance
  }
`

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