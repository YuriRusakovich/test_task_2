import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        users(orderBy: OrderUsersById): [User!]
        user(id: ID!): User
        me: User
    }

    extend type Mutation {
        deleteUser(id: ID!): Boolean!
        updateUser(id: ID!, rating: Int!): User
        signIn(login: String!): Token!
    }

    type User {
        id: ID!
        name: String!
        photo: String!
        large_photo: String!
        login: String!
        email: String!
        phone: String!
        rating: Int!
        messages: [Message!]
    }

    type Token {
        token: String!
    }

    input OrderUsersById {
        id: Sort
    }

    enum Sort {
        asc
        desc
    }
`;
