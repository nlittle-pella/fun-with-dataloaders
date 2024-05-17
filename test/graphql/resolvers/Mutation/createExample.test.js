import {randomUUID} from 'node:crypto';

import joi from 'joi';

import {handler, schemas} from '../../../../src/graphql/resolvers/Mutation/createExample.js';
import {addExample} from '../../../../src/repositories/example-repository.js';

jest.mock('node:crypto');
jest.mock('../../../../src/repositories/example-repository.js');

describe('createExample', () => {
    describe('handler', () => {
        test('should add the example', async () => {
            const example = {
                id: chance.guid(),
            };
            const newExample = {
                id: chance.guid(),
            };
            const args = {input: {example}};

            addExample.mockResolvedValue(newExample);

            const results = await handler({}, args);

            expect(addExample).toHaveBeenCalledTimes(1);
            expect(addExample).toHaveBeenCalledWith(example);

            expect(results).toStrictEqual(newExample);
        });

        test('should create an id if it is not provided', async () => {
            const id = chance.guid();
            const example = {};
            const args = {input: {example}};

            randomUUID.mockReturnValue(id);
            addExample.mockResolvedValue(example);

            const results = await handler({}, args);

            expect(addExample).toHaveBeenCalledTimes(1);
            expect(addExample).toHaveBeenCalledWith({
                ...example,
                id,
            });

            expect(results).toStrictEqual(example);
        });
    });

    describe('schemas', () => {
        describe('args', () => {
            let example;

            beforeEach(() => {
                example = {
                    id: chance.guid(),
                };
            });

            describe('id', () => {
                test('should not fail if the id is not provided', () => {
                    delete example.id;

                    try {
                        const validate = joi.attempt({input: {example}}, schemas.args);

                        expect(validate).toBeDefined();
                    } catch (error) {
                        fail(error);
                    }
                });

                test('should fail if the id is not a string', () => {
                    example.id = chance.natural();

                    try {
                        joi.attempt({input: {example}}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"input.example.id" must be a string');
                    }
                });

                test('should fail if the id is not a guid', () => {
                    example.id = chance.string();

                    try {
                        joi.attempt({input: {example}}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"input.example.id" must be a valid GUID');
                    }
                });
            });
        });
    });
});
