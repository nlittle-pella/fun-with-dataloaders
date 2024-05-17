import joi from 'joi';

import {handler, schemas} from '../../../../src/graphql/resolvers/Query/getExampleById.js';
import {selectExampleById} from '../../../../src/repositories/example-repository.js';

jest.mock('node:crypto');
jest.mock('../../../../src/repositories/example-repository.js');

describe('getExampleById', () => {
    describe('handler', () => {
        test('should get the example by the id provided', async () => {
            const id = chance.guid();
            const example = {
                id,
            };

            const args = {id};

            selectExampleById.mockResolvedValue(example);

            const results = await handler({}, args);

            expect(selectExampleById).toHaveBeenCalledTimes(1);
            expect(selectExampleById).toHaveBeenCalledWith(id);

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
                test('should fail if the id is not provided', () => {
                    try {
                        joi.attempt({}, schemas.args);

                        fail();
                    } catch (error) {
                        expect(error.details[0].message).toBe('"id" is required');
                    }
                });

                test('should fail if the id is not a string', () => {
                    example.id = chance.natural();

                    try {
                        joi.attempt({id: chance.natural()}, schemas.args);
                    } catch (error) {
                        expect(error.details[0].message).toBe('"id" must be a string');
                    }
                });

                test('should fail if the id is not a valid guid', () => {
                    example.id = chance.string();

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
