import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const createMessageMutation: DocumentNode = gql`
    mutation Mutation($createMessageText: String!, $createMessageId: Int!) {
        createMessage(text: $createMessageText, id: $createMessageId) {
            id
            text
            createdAt
            user {
                id
                name
                photo
            }
            owner {
                id
            }
        }
    }
`;
