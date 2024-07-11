import Dataloader from 'dataloader';

import {booksForAuthorIds} from '../../repositories/repo.js';

const goToDatabase = (authorIds) => {
    console.log('\t\tgoing to database to fetch books for:', authorIds);

    return Promise.resolve(booksForAuthorIds(authorIds));
};

const loader = () => new Dataloader((authorIds) => goToDatabase(authorIds));

export {loader};
