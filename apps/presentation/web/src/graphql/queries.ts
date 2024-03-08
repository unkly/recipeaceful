import { graphql } from './generated'

export const MUTATION_REGISTER_USER = graphql(`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      result
    }
  }
`)
