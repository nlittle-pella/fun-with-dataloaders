import {startAPI} from '@pella/graphql-api';

import {afterServerStops, beforeServerStarts, healthzHandler} from '../src/infrastructure/server.js';
import graphqlDataSources from '../src/graphql/loaders/index.js';

jest.mock('@pella/graphql-api');

describe('index', () => {
    test('should start up the server', async () => {
        await import('../index.js');

        expect(startAPI).toHaveBeenCalledTimes(1);
        expect(startAPI).toHaveBeenCalledWith({
            afterServerStops,
            beforeServerStarts,
            graphqlDataSources,
            healthzHandler,
            enableGraphqlFederation: true,
            name: 'author-api',
            port: 5130,
        });
    });
});
