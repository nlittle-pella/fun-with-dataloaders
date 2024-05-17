const process = require('node:process');

module.exports = () => {
    process.env.TZ = 'UTC';
};
