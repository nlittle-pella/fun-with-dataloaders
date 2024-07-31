import config from 'config';
import {initialize, destroy} from '@pella/postgres-adapter';

const afterServerStops = async () => {
    await destroy();
};

const beforeServerStarts = () => {
    console.log(config.get('db'));
    initialize(config.get('db'));
};

const healthzHandler = (_request, response) => response.json({sql: 'ok'});

export {
    afterServerStops,
    beforeServerStarts,
    healthzHandler,
};
