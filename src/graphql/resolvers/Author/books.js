const handler = (parent, _args, context) => {
    console.log('\tcalling nested books resolver');

    const loader = context.dataSources.booksByAuthorId;

    const authorId = parent.id;

    const books = loader.load(authorId);

    return books;
};

export {
    handler,
};
