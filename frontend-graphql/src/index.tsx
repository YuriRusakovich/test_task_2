import React from 'react';
import { render } from 'react-dom';
import App from '@components/app';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

const cache = new InMemoryCache();

const GRAPHQL_BASE_URL = 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
    uri: GRAPHQL_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('Token');
    return {
        headers: {
            ...headers,
            'x-token': token ? token : '',
        },
    };
});

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            switch (err.extensions?.code) {
                case 'UNAUTHENTICATED':
                    localStorage.removeItem('Token');
            }
        }
    }
});

const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache,
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
