# To build this project
- cd to backend directory and 'cdk deploy DevhrProjectStack'
- once deployed get all the info and fill-in frontend/src/config.json
- cd to frontend directory and 'yar build' so that frontend/build folder has new files
- cd to backend directory and 'cdk deploy DevhrProjectStack'
- to open site get public bucket url from output of 'cdk deploy DevhrProjectStack' 
e.g. http://devhrprojectstack-cdkreknpublicbucket22d34a6d-czzoedljq7re.s3-website-us-east-1.amazonaws.com/ This is important to note it.s
