import {query} from '@pella/postgres-adapter';

import {
    insertExampleQuery,
    selectExampleByIdQuery,
} from './queries/example.js';

const addExample = async (example) => {
    const {rows} = await query(insertExampleQuery, [
        example.id,
    ]);

    return rows[0];
};

const selectExampleById = async (id) => {
    const {rows} = await query(selectExampleByIdQuery, [
        id,
    ]);

    return rows[0];
};

export {
    addExample,
    selectExampleById,
};
