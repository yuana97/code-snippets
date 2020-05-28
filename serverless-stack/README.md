Set up, develop, deploy a full stack Serverless web app. Credit to https://serverless-stack.com/

# Table of contents
1. [AWS Account Setup](#prereqs)
1. [Infrastructure Setup](#infra)

## AWS Account Setup <a name="prereqs"></a>
1. Create an IAM user
    1. Create an AWS account https://serverless-stack.com/chapters/create-an-aws-account.html
    1. Create an IAM user under the account https://serverless-stack.com/chapters/create-an-iam-user.html and record the access key id and secret.
1. Set up AWS CLI
    1. brew install awscli (for windows users see https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)
    2. aws configure (copy your AKID and secret)

## Infrastructure Setup <a name="infra"></a>

**DynamoDB**

key-value database for storing our notes data.

1. Log in to AWS Console https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2 and search DynamoDB. Click DynamoDB and you should be at the DynamoDB console
1. Create table > table name = notes, partition key = userId, sort key = noteId > deselect 'use default settings' and select On-demand > Create
1. You should see your notes table has been created.

**S3**

Storage service for our file uploads (if user uploads file with note)

1. Search S3 and click into the S3 console.
1. Create Bucket > name=notes-app-bucket-12 (needs to be unique name in regino), region=us east (virginia)
1. select bucket > permissions > cors configuration > write this cors configuration https://pastebin.com/jixu0439

**Cognito**

User accounts and authentication.

1. Cognito > Manage your User Pools
