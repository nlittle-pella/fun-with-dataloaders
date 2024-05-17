import {startAPI} from '@pella/graphql-api';

import {afterServerStops, beforeServerStarts, healthzHandler} from './src/infrastructure/server.js';

startAPI({
    afterServerStops,
    beforeServerStarts,
    healthzHandler,
    enableGraphqlFederation: true,
    name: 'author-api',
    port: 5130,
});
