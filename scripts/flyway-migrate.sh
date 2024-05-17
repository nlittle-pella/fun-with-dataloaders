#!/bin/bash

flyway_script_path=$(cd "$(dirname "${0}")" ; cd ../infrastructure/postgres ; pwd -P)

if [[ $APPLY_TO_DEPLOYED_DB ]]
then
  docker run --network="host" \
    -v ${flyway_script_path}/migrations:/flyway/sql:ro \
    --rm flyway/flyway:9.1.4-alpine \
    migrate -user=flyway -password="$DEPLOYED_DB_PASSWORD" -connectRetries=10 \
    -url='jdbc:postgresql://localhost:5432/exampleapidb' -locations=filesystem:/flyway/sql
else
  docker run \
    -v ${flyway_script_path}/migrations:/flyway/sql:ro \
    --network example-api_default \
    --rm flyway/flyway:9.1.4-alpine \
    migrate -user=flyway -password=flyway_ps -connectRetries=10 \
    -url='jdbc:postgresql://example-db:5432/example-api' -locations=filesystem:/flyway/sql
fi
