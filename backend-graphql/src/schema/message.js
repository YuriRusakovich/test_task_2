import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        message(id: ID!): Message!
    }

    extend type Mutation {
        createMessage(text: String!, id: Int!): Message!
        deleteMessage(id: ID!): Boolean!
    }

    type Message {
        id: ID!
        text: String!
        user: User!
        owner: User!
        createdAt: String!
    }
`;
