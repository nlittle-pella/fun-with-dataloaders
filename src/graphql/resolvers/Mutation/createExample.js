import {randomUUID} from 'node:crypto';

import joi from 'joi';

import {addExample} from '../../../repositories/example-repository.js';

const handler = (parent, args) => {
    const {id = randomUUID(), ...rest} = args.input.example;

    return addExample({
        id,
        ...rest,
    });
};

const schemas = {
    args: joi.object({
        input: {
            example: joi.object({
                id: joi.string().guid(),
            }),
        },
    }),
};

export {
    handler,
    schemas,
};
