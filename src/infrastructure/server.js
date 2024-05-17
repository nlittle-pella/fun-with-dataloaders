import config from 'config';
import {getSqlHealth, initialize, destroy} from '@pella/postgres-adapter';

const afterServerStops = async () => {
    await destroy();
};

const beforeServerStarts = () => {
    initialize(config.get('db'));
};

const healthzHandler = async (request, response) => {
    const sql = await getSqlHealth();

    return response.json({sql});
};

export {
    afterServerStops,
    beforeServerStarts,
    healthzHandler,
};
