import {authors} from '../../../repositories/repo.js';

const getAuthors = () => {
    console.log('\nroundtrip to database for authors');

    return authors;
};

export const handler = () => getAuthors();
