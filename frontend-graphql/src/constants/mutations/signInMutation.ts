import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const signInMutation: DocumentNode = gql`
    mutation Mutation($signInLogin: String!) {
        signIn(login: $signInLogin) {
            token
        }
    }
`;
