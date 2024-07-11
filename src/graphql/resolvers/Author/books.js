import {booksByAuthor} from '../../../repositories/repo.js';

const goToDatabase = (authorId) => {
    console.log('\t\tgoing to database to fetch books for:', authorId);

    return booksByAuthor(authorId);
};

const handler = (parent, args, context) => {
    console.log('\tcalling nested books resolver');
    const authorId = parent.id;

    const books = goToDatabase(authorId);

    return books;
};

export {
    handler,
};
