import fs from 'node:fs';
import {dirname} from 'node:path';

import replace from 'replace-in-file';

const appDir = dirname('');

/* eslint-disable require-unicode-regexp, no-empty-function, no-console, node/prefer-global/process */
try {
    const resource = process.argv[2];
    const resourceFirstUpperCased = `${resource[0].toUpperCase()}${resource.slice(1)}`;
    const resourceUpperCased = resource.toUpperCase();

    const files = [
        '.github/**',
        'acceptance/graphql/**/*.*',
        'config/**.json',
        'infrastructure/**/*.sql',
        'scripts/**.sh',
        'scripts/**.md',
        'src/**/*.js',
        'src/**/*.graphql',
        'test/**/*.js',
        'helm/*.yaml',
        'docker-compose.yml',
        'index.js',
        'package.json',
        'package-lock.json',
        'README.md',
        'Dockerfile',
    ];

    await replace({
        files,
        from: /example/g,
        to: resource,
    });

    await replace({
        files,
        from: /Example/g,
        to: resourceFirstUpperCased,
    });

    await replace({
        files,
        from: /EXAMPLE/g,
        to: resourceUpperCased,
    });

    fs.rename(`${appDir}/src/graphql/resolvers/Mutation/createExample.js`, `${appDir}/src/graphql/resolvers/Mutation/create${resourceFirstUpperCased}.js`, () => {});
    fs.rename(`${appDir}/test/graphql/resolvers/Mutation/createExample.test.js`, `${appDir}/test/graphql/resolvers/Mutation/create${resourceFirstUpperCased}.test.js`, () => {});
    fs.rename(`${appDir}/acceptance/graphql/Mutation/createExample.test.js`, `${appDir}/acceptance/graphql/Mutation/create${resourceFirstUpperCased}.test.js`, () => {});
    fs.rename(`${appDir}/src/graphql/resolvers/Query/getExampleById.js`, `${appDir}/src/graphql/resolvers/Query/get${resourceFirstUpperCased}ById.js`, () => {});
    fs.rename(`${appDir}/test/graphql/resolvers/Query/getExampleById.test.js`, `${appDir}/test/graphql/resolvers/Query/get${resourceFirstUpperCased}ById.test.js`, () => {});
    fs.rename(`${appDir}/acceptance/graphql/Query/getExampleById.test.js`, `${appDir}/acceptance/graphql/Query/get${resourceFirstUpperCased}ById.test.js`, () => {});
    fs.rename(`${appDir}/src/repositories/queries/example.js`, `${appDir}/src/repositories/queries/${resource}.js`, () => {});
    fs.rename(`${appDir}/src/repositories/example-repository.js`, `${appDir}/src/repositories/${resource}-repository.js`, () => {});
    fs.rename(`${appDir}/test/repositories/example-repository.test.js`, `${appDir}/test/repositories/${resource}-repository.test.js`, () => {});
    fs.rename(`${appDir}/infrastructure/postgres/migrations/schema/V3__create_example_table.sql`, `${appDir}/infrastructure/postgres/migrations/schema/V3__create_${resource}_table.sql`, () => {});
} catch (error) {
    console.error('Error occurred:', error);
}
/* eslint-enable */
