# To build this project
- cd to backend directory and `cdk deploy AwsdevhourBackendPipelineStack` to deploy CodePipeline. Backend stack `DevhrProjectStack` will be created by CodePipeline when any commits are pushed to this github repo.
- once backend stack `DevhrProjectStack` is deployed get all the info and fill-in `src/config.json` in `devhr_frontend_project` repo.
- In `devhr_frontend_project` repo do `yarn build` so that `build` folder has newly built files
- In `cdk_devhr_project` do `git add --all`, `git commit -am 'changes'` and `git push` so that `DevhrProjectStack` gets updated and public S3 bucket gets new files. 
- To open site get public bucket url from output of `DevhrProjectStack` in CloudFormation
e.g. `http://devhrprojectstack-cdkreknpublicbucket22d34a6d-czzoedljq7re.s3-website-us-east-1.amazonaws.com/` This is important for it to work.

# Further notes
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

