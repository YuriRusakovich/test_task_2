import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const userQuery: (id: number) => DocumentNode = (id: number) => gql`
    {
        user(id: ${id}) {
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
