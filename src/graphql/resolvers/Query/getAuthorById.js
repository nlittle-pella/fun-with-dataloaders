import joi from 'joi';

import {selectAuthorById} from '../../../repositories/author-repository.js';

const handler = (parent, args) => selectAuthorById(args.id);

const schemas = {
    args: joi.object({
        id: joi.string().guid().required(),
    }),
};

export {
    handler,
    schemas,
};
