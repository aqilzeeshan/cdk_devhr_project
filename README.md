# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

Contains https://cdkworkshop.com/20-typescript.html 

Link of actual repo https://github.com/aws-samples/aws-dev-hour-backend

cdk bootstrap aws://730644355952/us-east-1
cdk init -l typescript
cdk synth
cdk deploy
cdk destroy

Already generated pillow s3://email-aq/pillow2.zip

To generate it yourself do the following:

Use Cloud9 to create Linux AMI 2 micro instance

+ sudo yum install -y python3-pip python3 python3-setuptools
+ python3 -m venv my_app/env
+ source ~/my_app/env/bin/activate
+ sudo pip3 install pillow
+ cd /usr/local/lib64/python3.7/site-packages
+ mkdir python
+ sudo cp -R ./PIL ./python
+ sudo cp -R ./Pillow-8.1.0.dist-info ./python
+ sudo cp -R ./Pillow.libs ./python
+ sudo zip -r pillow.zip ./python 
+ aws configure (key in C:\Users\amuham210\Documents\KeyPair)
+ aws s3 cp pillow.zip s3://email-aq/pillow.zip
