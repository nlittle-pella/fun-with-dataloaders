import {randomUUID} from 'node:crypto';

import {gql} from '@apollo/client/core';

import {initializeClient} from '../../utils.js';

describe('createExample', () => {
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

        expect(createExample.id).toBe(id);
    });
});
