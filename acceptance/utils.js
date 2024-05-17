import {ApolloClient, InMemoryCache} from '@apollo/client/core';

export const initializeClient = () => {
    const uri = 'http://localhost:5130/graphql';

    return new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false,
        }),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
        },
        uri,
    });
};
