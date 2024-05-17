import joi from 'joi';

import {selectExampleById} from '../../../repositories/example-repository.js';

const handler = (parent, args) => selectExampleById(args.id);

const schemas = {
    args: joi.object({
        id: joi.string().guid().required(),
    }),
};

export {
    handler,
    schemas,
};
