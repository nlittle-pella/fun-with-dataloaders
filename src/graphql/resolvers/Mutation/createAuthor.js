import {randomUUID} from 'node:crypto';

import joi from 'joi';

import {addAuthor} from '../../../repositories/author-repository.js';

const handler = (parent, args) => {
    const {id = randomUUID(), ...rest} = args.input.author;

    return addAuthor({
        id,
        ...rest,
    });
};

const schemas = {
    args: joi.object({
        input: {
            author: joi.object({
                id: joi.string().guid(),
            }),
        },
    }),
};

export {
    handler,
    schemas,
};
