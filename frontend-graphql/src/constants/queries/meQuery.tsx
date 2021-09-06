import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const me: DocumentNode = gql(`query Query {
  me {
    id
    name
    large_photo
    photo
    login
    email
    phone
    rating
  }
}`);
