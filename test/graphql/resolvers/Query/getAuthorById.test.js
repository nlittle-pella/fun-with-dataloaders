import joi from 'joi';

import {handler, schemas} from '../../../../src/graphql/resolvers/Query/getAuthorById.js';
import {selectAuthorById} from '../../../../src/repositories/author-repository.js';

jest.mock('node:crypto');
jest.mock('../../../../src/repositories/author-repository.js');

describe('getAuthorById', () => {
    describe('handler', () => {
        test('should get the author by the id provided', async () => {
            const id = chance.guid();
            const author = {
                id,
            };

            const args = {id};

            selectAuthorById.mockResolvedValue(author);

            const results = await handler({}, args);

            expect(selectAuthorById).toHaveBeenCalledTimes(1);
            expect(selectAuthorById).toHaveBeenCalledWith(id);

            expect(results).toStrictEqual(author);
        });
    });

    describe('schemas', () => {
        describe('args', () => {
            let author;

            beforeEach(() => {
                author = {
                    id: chance.guid(),
                };
            });

            describe('id', () => {
                test('should fail if the id is not provided', () => {
                    try {
                        joi.attempt({}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"id" is required');
                    }
                });

                test('should fail if the id is not a string', () => {
                    author.id = chance.natural();

                    try {
                        joi.attempt({id: chance.natural()}, schemas.args);
                    } catch (error) {
                        expect(error.details[0].message).toBe('"id" must be a string');
                    }
                });

                test('should fail if the id is not a valid guid', () => {
                    author.id = chance.string();

                    try {
                        joi.attempt({id: chance.string()}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"id" must be a valid GUID');
                    }
                });
            });
        });
    });
});
