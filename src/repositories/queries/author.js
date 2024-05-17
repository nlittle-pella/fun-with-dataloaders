const authorAttributes = `
    id
`;

const insertAuthorQuery = `
    INSERT INTO author.author (
        id
    )
    VALUES (
        $1
    )
    RETURNING ${authorAttributes};
`;

const selectAuthorByIdQuery = `
    SELECT ${authorAttributes}
    FROM author.author
    WHERE id = $1
`;

export {
    insertAuthorQuery,
    selectAuthorByIdQuery,
};
