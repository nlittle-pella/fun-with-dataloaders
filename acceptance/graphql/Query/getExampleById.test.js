import {randomUUID} from 'node:crypto';

import {gql} from '@apollo/client/core';

import {initializeClient} from '../../utils.js';

describe('getExampleById', () => {
    let client,
        id;

    beforeAll(() => {
        client = initializeClient();
    });

    beforeEach(() => {
        id = randomUUID();
    });

    test('should be able to get the example that was just added', async () => {
        const {data: {createExample}} = await client.mutate({
            mutation: gql`
                mutation CreateExample($input: CreateExampleInput!) {
                    createExample(input: $input) {
                        id
                    }
                }
            `,
            variables: {
                input: {
                    example: {
                        id,
                    },
                },
            },
        });

        const {data: {getExampleById}} = await client.query({
            query: gql`
                query GetExampleById($id: String!) {
                    getExampleById(id: $id) {
                        id
                    }
                }
            `,
            variables: {
                id,
            },
        });

        expect(getExampleById.id).toBe(createExample.id);
    });

    test('should return null if the example does not exist by that id', async () => {
        const {data: {getExampleById}} = await client.query({
            query: gql`
                query GetExampleById($id: String!) {
                    getExampleById(id: $id) {
                        id
                    }
                }
            `,
            variables: {
                id: randomUUID(),
            },
        });

        expect(getExampleById).toBeNull();
    });
});
