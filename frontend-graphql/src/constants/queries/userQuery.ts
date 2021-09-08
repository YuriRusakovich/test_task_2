import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const userQuery: DocumentNode = gql`
    query Query($userId: ID!) {
        user(id: $userId) {
            id
            name
            photo
            large_photo
            login
            email
            phone
            rating
            messages {
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
    }
`;
