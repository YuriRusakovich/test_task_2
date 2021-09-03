import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const deleteUserMutation: DocumentNode = gql`
    mutation Mutation($id: ID!) {
        deleteUser(id: $id)
    }
`;
