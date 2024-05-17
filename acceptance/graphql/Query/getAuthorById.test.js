import {randomUUID} from 'node:crypto';

import {gql} from '@apollo/client/core';

import {initializeClient} from '../../utils.js';

describe('getAuthorById', () => {
    let client,
        id;

    beforeAll(() => {
        client = initializeClient();
    });

    beforeEach(() => {
        id = randomUUID();
    });

    test('should be able to get the author that was just added', async () => {
        const {data: {createAuthor}} = await client.mutate({
            mutation: gql`
                mutation CreateAuthor($input: CreateAuthorInput!) {
                    createAuthor(input: $input) {
                        id
                    }
                }
            `,
            variables: {
                input: {
                    author: {
                        id,
                    },
                },
            },
        });

        const {data: {getAuthorById}} = await client.query({
            query: gql`
                query GetAuthorById($id: String!) {
                    getAuthorById(id: $id) {
                        id
                    }
                }
            `,
            variables: {
                id,
            },
        });

        expect(getAuthorById.id).toBe(createAuthor.id);
    });

    test('should return null if the author does not exist by that id', async () => {
        const {data: {getAuthorById}} = await client.query({
            query: gql`
                query GetAuthorById($id: String!) {
                    getAuthorById(id: $id) {
                        id
                    }
                }
            `,
            variables: {
                id: randomUUID(),
            },
        });

        expect(getAuthorById).toBeNull();
    });
});
