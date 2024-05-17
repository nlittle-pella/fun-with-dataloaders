import {randomUUID} from 'node:crypto';

import {gql} from '@apollo/client/core';

import {initializeClient} from '../../utils.js';

describe('createAuthor', () => {
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

        expect(createAuthor.id).toBe(id);
    });
});
