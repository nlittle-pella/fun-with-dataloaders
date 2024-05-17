import {query} from '@pella/postgres-adapter';

import {
    addAuthor,
    selectAuthorById,
} from '../../src/repositories/author-repository.js';
import {
    insertAuthorQuery,
    selectAuthorByIdQuery,
} from '../../src/repositories/queries/author.js';

describe('author repository', () => {
    describe('addAuthor', () => {
        test('should insert the author to the database table and return it back out', async () => {
            const row = {
                [chance.string()]: chance.string(),
            };
            const author = {
                id: chance.guid(),
            };

            query.mockResolvedValue({
                rows: [row],
            });

            const result = await addAuthor(author);

            expect(query).toHaveBeenCalledTimes(1);
            expect(query).toHaveBeenCalledWith(insertAuthorQuery, [
                author.id,
            ]);

            expect(result).toStrictEqual(row);
        });
    });

    describe('selectAuthorById', () => {
        test('should select the author by id', async () => {
            const row = {
                [chance.string()]: chance.string(),
            };
            const id = chance.guid();

            query.mockResolvedValue({
                rows: [row],
            });

            const result = await selectAuthorById(id);

            expect(query).toHaveBeenCalledTimes(1);
            expect(query).toHaveBeenCalledWith(selectAuthorByIdQuery, [
                id,
            ]);

            expect(result).toStrictEqual(row);
        });
    });
});
