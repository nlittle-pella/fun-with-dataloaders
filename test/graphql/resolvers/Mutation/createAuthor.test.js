import {randomUUID} from 'node:crypto';

import joi from 'joi';

import {handler, schemas} from '../../../../src/graphql/resolvers/Mutation/createAuthor.js';
import {addAuthor} from '../../../../src/repositories/author-repository.js';

jest.mock('node:crypto');
jest.mock('../../../../src/repositories/author-repository.js');

describe('createAuthor', () => {
    describe('handler', () => {
        test('should add the author', async () => {
            const author = {
                id: chance.guid(),
            };
            const newAuthor = {
                id: chance.guid(),
            };
            const args = {input: {author}};

            addAuthor.mockResolvedValue(newAuthor);

            const results = await handler({}, args);

            expect(addAuthor).toHaveBeenCalledTimes(1);
            expect(addAuthor).toHaveBeenCalledWith(author);

            expect(results).toStrictEqual(newAuthor);
        });

        test('should create an id if it is not provided', async () => {
            const id = chance.guid();
            const author = {};
            const args = {input: {author}};

            randomUUID.mockReturnValue(id);
            addAuthor.mockResolvedValue(author);

            const results = await handler({}, args);

            expect(addAuthor).toHaveBeenCalledTimes(1);
            expect(addAuthor).toHaveBeenCalledWith({
                ...author,
                id,
            });

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
                test('should not fail if the id is not provided', () => {
                    delete author.id;

                    try {
                        const validate = joi.attempt({input: {author}}, schemas.args);

                        expect(validate).toBeDefined();
                    } catch (error) {
                        fail(error);
                    }
                });

                test('should fail if the id is not a string', () => {
                    author.id = chance.natural();

                    try {
                        joi.attempt({input: {author}}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"input.author.id" must be a string');
                    }
                });

                test('should fail if the id is not a guid', () => {
                    author.id = chance.string();

                    try {
                        joi.attempt({input: {author}}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"input.author.id" must be a valid GUID');
                    }
                });
            });
        });
    });
});
