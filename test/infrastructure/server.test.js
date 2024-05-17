import config from 'config';
import {initialize, destroy} from '@pella/postgres-adapter';

import {afterServerStops, beforeServerStarts, healthzHandler} from '../../src/infrastructure/server.js';

jest.mock('config');

describe('server', () => {
    test('should initialize the postgres adapter', async () => {
        const dbConfig = {
            database: chance.word(),
        };

        config.get.mockReturnValue(dbConfig);

        await beforeServerStarts();

        expect(initialize).toHaveBeenCalledTimes(1);
        expect(initialize).toHaveBeenCalledWith(dbConfig);
    });

    test('should destroy the connection pool when the server stops', async () => {
        await afterServerStops();

        expect(destroy).toHaveBeenCalledTimes(1);
        expect(destroy).toHaveBeenCalledWith();
    });

    test('should check the sql health and return ok response', async () => {
        const response = {
            json: jest.fn(),
        };

        await healthzHandler({}, response);

        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith({
            sql: 'ok',
        });
    });
});
