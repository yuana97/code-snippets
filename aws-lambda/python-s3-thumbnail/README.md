- npm install --save serverless-python-requirements
- start docker
- sls deploy -v

To use this lambda configure serverless.yml's custom.bucket and provider.profile attributes.

Tips: If access is denied check your bucket and s3 account settings: turn off block public access