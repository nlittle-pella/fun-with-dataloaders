import Dataloader from 'dataloader';

import {booksForAuthorIds} from '../../../repositories/repo.js';

const goToDatabase = (authorIds) => {
    console.log('\t\tgoing to database to fetch books for:', authorIds);

    return Promise.resolve(booksForAuthorIds(authorIds));
};

const handler = (parent, args, context) => {
    console.log('\tcalling nested books resolver');

    const loader = new Dataloader((authorIds) => goToDatabase(authorIds));

    const authorId = parent.id;

    const books = loader.load(authorId);

    return books;
};

export {
    handler,
};
