import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const updateUserMutation: DocumentNode = gql`
    mutation Mutation($id: ID!, $rating: Int!) {
        updateUser(id: $id, rating: $rating) {
            id
            name
            photo
            large_photo
            login
            email
            phone
            rating
        }
    }
`;
