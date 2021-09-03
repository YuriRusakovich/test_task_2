import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const usersQuery: DocumentNode = gql`
    {
        users(orderBy: { id: asc }) {
            id
            name
            large_photo
            login
            photo
            email
            phone
            rating
        }
    }
`;
