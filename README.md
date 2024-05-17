# author-graphql-api-with-postgres

**Previously author-api**

This is an author project that uses `@pella/graphql-api` and
stands up a Postgres Database using Docker. Both unit tests and acceptance
test are ran during the verify process as well. The workflow for this project is currently set up to deploy to our `EKS Clusters in AWS`.

## Getting Started
To use this template for a new repository, please visit the [Dalebot Repository](https://github.com/Pella-Digital-Team/dalebot) and open a new `Create Repo` issue, selecting the `author-api` template. Instructions on this can be found in the Dalebot readmes.

## Dependencies

### NPM

An NPM token is required to pull down `@pella` dependencies for this project. Please contact [the DevOps Team](mailto:devops@pella.com) to get one.

Once you receive your token you will need to add that to your `.bash_profile` or `.zshrc` file like so

```
export NPM_TOKEN=REPLACE_WITH_YOUR_TOKEN_HERE
```

### Docker

This project uses Docker to compose different images together. You will need to have [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.

## Using this template

There is a script that will replace all instances of `author-api` in all files with your repository name. To use this template, follow these steps:

1. Run `npm i`
2. Run `npm run replace (your-repository-name)`
3. Run `npm run verify`
4. Enjoy!

### Getting deployed

A Terraform PR to our [AWS Repository](https://github.com/Pella-Digital-Team/aws) is required when creating a new application. This will provision necessary resources for your app, including an IAM User, a corresponding Policy for the user, and your database. The DevOps team has created a tf module you can utilize, here is an author `your-app-name.tf` to reference.

```terraform
module "your_app_name" {
  source      = "./modules/eks-application"
  environment = var.aws_env == "prod" ? 1 : 0

  application_name = "your-app-name"
  owner_tag        = "your-team-name"
  db_subnet_group        = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids = aws_security_group.allow_postgres_tcp.id
  create_database  = true
}

data "aws_iam_policy_document" "your_app_name_policy_document" {
  statement {
    actions = [
      "logs:GetLogEvents",
    ]
    resources = [
      "arn:aws:logs:::log-group:/aws/eks/${local.cluster_name}/cluster:*"
    ]
    effect = "Allow"
  }
}

resource "aws_iam_user_policy" "pella_your_app_name_inline_policy" {
  name   = "your-app-name-inline-policy"
  user   = module.your_app_name.service_account_user_name
  policy = data.aws_iam_policy_document.your_app_name_policy_document.json
}
```

Once your terraform PR is merged, the DevOps team will generate the following secrets and place them in your GitHub repository's secrets.

* `AWS_ACCESS_KEY_ID_(env)`
* `AWS_SECRET_KEY_(env)`
* `FLYWAY_PASSWORD_(env)`
* `POSTGRES_PASSWORD_(env)`

