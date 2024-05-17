import {query} from '@pella/postgres-adapter';

import {
    addExample,
    selectExampleById,
} from '../../src/repositories/example-repository.js';
import {
    insertExampleQuery,
    selectExampleByIdQuery,
} from '../../src/repositories/queries/example.js';

describe('example repository', () => {
    describe('addExample', () => {
        test('should insert the example to the database table and return it back out', async () => {
            const row = {
                [chance.string()]: chance.string(),
            };
            const example = {
                id: chance.guid(),
            };

            query.mockResolvedValue({
                rows: [row],
            });

            const result = await addExample(example);

            expect(query).toHaveBeenCalledTimes(1);
            expect(query).toHaveBeenCalledWith(insertExampleQuery, [
                example.id,
            ]);

            expect(result).toStrictEqual(row);
        });
    });

    describe('selectExampleById', () => {
        test('should select the example by id', async () => {
            const row = {
                [chance.string()]: chance.string(),
            };
            const id = chance.guid();

            query.mockResolvedValue({
                rows: [row],
            });

            const result = await selectExampleById(id);

            expect(query).toHaveBeenCalledTimes(1);
            expect(query).toHaveBeenCalledWith(selectExampleByIdQuery, [
                id,
            ]);

            expect(result).toStrictEqual(row);
        });
    });
});
