const authors = [
    {
        id: 1,
        name: 'John Doe',
    },
    {
        id: 2,
        name: 'Jane Doe',
    },
    {
        id: 3,
        name: 'Alice Doe',
    },
];
const booksByAuthorMap = {
    [authors[0].id]: [
        {
            id: 1,
            title: `${authors[0].name} Book 1`,
        },
        {
            id: 2,
            title: `${authors[0].name} Book 2`,
        },
    ],
    [authors[1].id]: [
        {
            id: 3,
            title: `${authors[1].name} Book 1`,
        },
        {
            id: 4,
            title: `${authors[1].name} Book 2`,
        },
    ],
    [authors[2].id]: [
        {
            id: 5,
            title: `${authors[2].name} Book 1`,
        },
    ],
};

const booksByAuthor = (authorId) => booksByAuthorMap[authorId] || [];
const booksForAuthorIds = (authorIds) => authorIds.map((authorId) => booksByAuthor(authorId));

export {
    authors,
    booksByAuthor,
    booksForAuthorIds,
};
