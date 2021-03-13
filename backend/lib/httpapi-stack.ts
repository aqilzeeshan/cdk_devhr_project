import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

import apigatewayv2 = require('@aws-cdk/aws-apigatewayv2');
import apigatewayv2Integrations = require('@aws-cdk/aws-apigatewayv2-integrations');
import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';


export class HttpApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      //In-line lambda ///////////////////////////////////////////////////////////////////////
    const functionGenerateID = new lambda.Function(this, "GenerateID", {
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromInline(`
          const generate = () => Math.random().toString(36).substring(7);
      
          exports.handler = async () => ({"value": generate()});
        `),
      });
  
      //Good article on how to use Http Api in API Gateway v2
      //https://medium.com/swlh/aws-cdk-and-typescript-using-the-new-apigatewayv2-f7ad06c560d3
  
      // ========================================================================================
      // This construct builds a new Amazon API Gateway v2 with AWS Lambda Integratiton
      // ========================================================================================
      //Step-1:Create an integration
      const httpApiIntegration = new apigatewayv2Integrations.LambdaProxyIntegration({
        handler: functionGenerateID,
      });
  
      // ========================================================================================
      // API Gateway
      // ========================================================================================
      //Step-2:Define an HTTP API
      const httpApi = new apigatewayv2.HttpApi(this,"MyApi", {
        //Explained here https:docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
        corsPreflight: {
          allowHeaders: ['Authorization'],
          allowMethods: [apigatewayv2.HttpMethod.GET, apigatewayv2.HttpMethod.HEAD, apigatewayv2.HttpMethod.OPTIONS, apigatewayv2.HttpMethod.POST],
          allowOrigins: ['*'],
          maxAge: cdk.Duration.days(10),
        },
      });
      //Step-3:Add Routes
      httpApi.addRoutes({
        path: "/images",
        methods: [apigatewayv2.HttpMethod.ANY],
        integration: httpApiIntegration,
      });
      //To test: curl -i 'https://sppkcds6k2.execute-api.us-east-1.amazonaws.com/images'
  
      const clientErrorMetric = httpApi.metricClientError();
  
      // For example to create a CloudFront distribution that uses your S3Bucket as it's origin check following link
      //https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-cloudfront.CloudFrontWebDistribution.html
      const feCf = new CloudFrontWebDistribution(this, "MyCf", {
        defaultRootObject: "/",
        originConfigs: [{
          customOriginSource: {
            domainName: `${httpApi.httpApiId}.execute-api.${this.region}.${this.urlSuffix}`,
          },
          behaviors: [{
            isDefaultBehavior: true,
          }],
        }],
        enableIpV6: true,
      });
  
      //to create an Output to your console to get the Cloudfront Domain Name, you will have to use distributionDomainName now, instead of domainName
      new cdk.CfnOutput(this, "myOut", {
        value: feCf.distributionDomainName,
      });
      //To test: curl -i 'https://d2unavjgrt4rah.cloudfront.net/images' (as expected response will be cached by cloudfront)
  
    }
}