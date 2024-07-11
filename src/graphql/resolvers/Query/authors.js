import {authors} from '../../../repositories/repo.js';

const getAuthors = () => {
    // eslint-disable-next-line no-console
    console.log('\nroundtrip to database for authors');

    return authors;
};

export const handler = () => getAuthors();
