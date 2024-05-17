const exampleAttributes = `
    id
`;

const insertExampleQuery = `
    INSERT INTO example.example (
        id
    )
    VALUES (
        $1
    )
    RETURNING ${exampleAttributes};
`;

const selectExampleByIdQuery = `
    SELECT ${exampleAttributes}
    FROM example.example
    WHERE id = $1
`;

export {
    insertExampleQuery,
    selectExampleByIdQuery,
};
