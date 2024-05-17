import {query} from '@pella/postgres-adapter';

import {
    insertAuthorQuery,
    selectAuthorByIdQuery,
} from './queries/author.js';

const addAuthor = async (author) => {
    const {rows} = await query(insertAuthorQuery, [
        author.id,
    ]);

    return rows[0];
};

const selectAuthorById = async (id) => {
    const {rows} = await query(selectAuthorByIdQuery, [
        id,
    ]);

    return rows[0];
};

export {
    addAuthor,
    selectAuthorById,
};
