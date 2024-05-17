### Steps for connecting to the db

On Mac, install the following via brew: 
 - https://formulae.brew.sh/formula/aws-sso-cli
 - https://formulae.brew.sh/formula/awscli
 - https://formulae.brew.sh/cask/session-manager-plugin

Run `aws-sso`

You will be prompted to name the config, and then provide two values:
 - Host: d-9a67019f2e.awsapps.com
 - Region: us-east-2

Run `aws-sso exec` to set your credentials for the current shell.
 - Use the console to navigate to the option you want (DeveloperAccess in most cases). 
 - Use the down arrow key to select Role, and then press the space bar to see the roles get prompted.

In the same terminal, `cd` to this folder (where `connect-to-db.sh` lives. 
Run the `connect-to-db.sh` script.

Open up your db tool of choice (IntelliJ, WebStorm, DataGrip) and connect to `localhost:5432` using the credentials for `author-api` db found in AWS Secrets Manager and `authorapidb` as the db name. 
