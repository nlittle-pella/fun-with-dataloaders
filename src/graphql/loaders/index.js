import {loader as booksByAuthorId} from './booksByAuthorId.js';

const graphqlDataSources = () => ({
    booksByAuthorId: booksByAuthorId(),
});

export default graphqlDataSources;
