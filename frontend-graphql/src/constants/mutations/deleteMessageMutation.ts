import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const deleteMessageMutation: DocumentNode = gql`
    mutation Mutation($deleteMessageId: ID!) {
        deleteMessage(id: $deleteMessageId)
    }
`;
