import {gql} from '@apollo/client/core';

import {initializeClient} from '../../utils.js';

describe('authors', () => {
    test('should get the authors and their books', async () => {
        const client = initializeClient();
        const {data: {authors}} = await client.query({
            query: gql`
                query {
                    authors {
                        id
                        name
                        books {
                            id
                            title
                        }
                    }
                }
            `,
        });

        expect(authors).toHaveLength(3);
        expect(authors).toStrictEqual([
            {
                id: 1,
                name: 'John Doe',
                books: [
                    {
                        id: 1,
                        title: 'John Doe Book 1',
                    },
                    {
                        id: 2,
                        title: 'John Doe Book 2',
                    },
                ],
            },
            {
                id: 2,
                name: 'Jane Doe',
                books: [
                    {
                        id: 3,
                        title: 'Jane Doe Book 1',
                    },
                    {
                        id: 4,
                        title: 'Jane Doe Book 2',
                    },
                ],
            },
            {
                id: 3,
                name: 'Alice Doe',
                books: [
                    {
                        id: 5,
                        title: 'Alice Doe Book 1',
                    },
                ],
            },
        ]);
    });
});
