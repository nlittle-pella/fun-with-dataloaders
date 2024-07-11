import {startAPI} from '@pella/graphql-api';

import {afterServerStops, beforeServerStarts, healthzHandler} from './src/infrastructure/server.js';
import graphqlDataSources from './src/graphql/loaders/index.js';

startAPI({
    afterServerStops,
    beforeServerStarts,
    graphqlDataSources,
    healthzHandler,
    enableGraphqlFederation: true,
    name: 'author-api',
    port: 5130,
});
