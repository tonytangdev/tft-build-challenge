import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

const OPENAI_SECRET_NAME = "OpenAI-tft-build-challenges";
const REGION = process.env.CDK_DEFAULT_REGION ?? "";

export class ScriptsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // dynamodb - serverless
    const tftCompositionTable = new cdk.aws_dynamodb.Table(this, "Table", {
      partitionKey: { name: "id", type: cdk.aws_dynamodb.AttributeType.STRING },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
    });
    // add to stack output
    new cdk.CfnOutput(this, "TFT Composition Table output", {
      value: tftCompositionTable.tableName,
    });

    // secret - OpenAI API key
    const openaiSecret = cdk.aws_secretsmanager.Secret.fromSecretNameV2(
      this,
      "OpenAI Secret",
      OPENAI_SECRET_NAME,
    );

    // lambda - call AI API to build tft composition
    const tftCompositionLambda = new NodejsFunction(
      this,
      "Create TFT Composition",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        handler: "handler",
        entry: path.join(__dirname, "../lambdas/createTFTComposition/index.ts"),
        // pass the secret to the lambda
        environment: { OPENAI_SECRET_NAME, REGION },
        timeout: cdk.Duration.seconds(30),
        memorySize: 512,
      },
    );
    // add to stack output
    new cdk.CfnOutput(this, "TFT Composition Lambda output", {
      value: tftCompositionLambda.functionArn,
    });
    // authorize to read the secret
    openaiSecret.grantRead(tftCompositionLambda);

    // lambda - call AI API to know when the output is ready
    const tftCompositionStatusLambda = new NodejsFunction(
      this,
      "Get TFT Composition",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        handler: "handler",
        entry: path.join(__dirname, "../lambdas/getTFTComposition/index.ts"),
        // pass the secret to the lambda
        environment: { OPENAI_SECRET_NAME, REGION },
        timeout: cdk.Duration.seconds(30),
        memorySize: 512,
      },
    );
    // add to stack output
    new cdk.CfnOutput(this, "Get TFT Composition output", {
      value: tftCompositionStatusLambda.functionArn,
    });
    // authorize to read the secret
    openaiSecret.grantRead(tftCompositionStatusLambda);

    // lambda - save the output in dynamodb
    const tftCompositionSaveLambda = new NodejsFunction(
      this,
      "Save TFT Composition",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        handler: "handler",
        entry: path.join(__dirname, "../lambdas/saveTFTComposition/index.ts"),
        environment: {
          TFT_COMPOSITION_TABLE_NAME: tftCompositionTable.tableName,
          REGION,
        },
        timeout: cdk.Duration.seconds(30),
        memorySize: 512,
      },
    );

    // add to stack output
    new cdk.CfnOutput(this, "Save TFT Composition output", {
      value: tftCompositionSaveLambda.functionArn,
    });
  }
}
