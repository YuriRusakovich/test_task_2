import React from 'react';
import { render } from 'react-dom';
import App from '@components/app';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const GRAPHQL_BASE_URL = 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
    uri: GRAPHQL_BASE_URL,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache,
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
