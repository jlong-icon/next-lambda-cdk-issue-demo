import { NextStandaloneStack } from "@sladg/nextjs-lambda";
import {
  handler as optimizerHandler,
  optimizerCodePath,
  optimizerLayerPath,
  version as optimizerVersion,
} from "@sladg/imaginex-lambda";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";

export const DEFAULT_MEMORY = 1024;
export const DEFAULT_TIMEOUT = 20;
export const DEFAULT_RUNTIME = lambda.Runtime.NODEJS_16_X;

export class CdkStack extends NextStandaloneStack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      apigwImagePath: "/_image",
      apigwServerPath: "/_server",
      assetsZipPath: "../my-app/next.out/assetsLayer.zip",
      dependenciesZipPath: "../my-app/next.out/dependenciesLayer.zip",
      codeZipPath: "../my-app/next.out/code.zip",
      customServerHandler: "index.handler",
      lambdaTimeout: DEFAULT_TIMEOUT,
      lambdaMemory: DEFAULT_MEMORY,
      lambdaRuntime: DEFAULT_RUNTIME,
      customImageHandler: optimizerHandler,
      imageLambdaHash: optimizerVersion,
      imageHandlerZipPath: optimizerCodePath,
      imageLayerZipPath: optimizerLayerPath,
      domainNames: [],
      redirectFromApex: false,
    });
  }
}
