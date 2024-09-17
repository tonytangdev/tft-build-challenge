import { Handler } from "aws-lambda";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import OpenAI from "openai";

const { REGION, OPENAI_SECRET_NAME } = process.env;

const secretsClient = new SecretsManagerClient({ region: REGION });
let openai: OpenAI;
let assistantId: string;

export const handler: Handler = async () => {
  await initOpenAI();

  const { runId, threadId } = await askAIForANewTFTComposition();
  return {
    threadId,
    runId,
  };
};

async function initOpenAI() {
  if (!openai) {
    const secret = await secretsClient.send(
      new GetSecretValueCommand({ SecretId: OPENAI_SECRET_NAME }),
    );

    const { openai_api_key: apiKey, openai_assistant_id: openAIAssistantId } =
      JSON.parse(secret.SecretString ?? "{}");

    if (!apiKey) {
      throw new Error("No secret found");
    }
    openai = new OpenAI({
      apiKey: apiKey,
    });
    assistantId = openAIAssistantId;
  }
}

async function askAIForANewTFTComposition() {
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Create me a TFT composition",
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  });
  return {
    threadId: thread.id,
    runId: run.id,
  };
}
