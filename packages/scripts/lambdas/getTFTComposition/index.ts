import { Handler } from "aws-lambda";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import OpenAI from "openai";
import { z } from "zod";

const { REGION, OPENAI_SECRET_NAME } = process.env;

const secretsClient = new SecretsManagerClient({ region: REGION });
let openai: OpenAI;

const EventSchema = z.object({
  threadId: z.string(),
  runId: z.string(),
});

export const handler: Handler = async (event: unknown) => {
  const { threadId, runId } = EventSchema.parse(event);
  await initOpenAI();

  const run = await openai.beta.threads.runs.poll(threadId, runId);

  if (run.status !== "completed") {
    throw new Error("Run is not completed");
  }

  const messages = await openai.beta.threads.messages.list(threadId);
  const lastMessage = messages.data[0];

  if (lastMessage.role !== "assistant") {
    throw new Error("Last message is not from the assistant");
  }

  if (lastMessage.content[0].type !== "text") {
    throw new Error("Last message is not text");
  }

  const tftComposition = JSON.parse(lastMessage.content[0].text.value);
  return {
    tftComposition,
  };
};

async function initOpenAI() {
  if (!openai) {
    const secret = await secretsClient.send(
      new GetSecretValueCommand({ SecretId: OPENAI_SECRET_NAME }),
    );

    const { openai_api_key: apiKey } = JSON.parse(secret.SecretString ?? "{}");

    if (!apiKey) {
      throw new Error("No secret found");
    }
    openai = new OpenAI({
      apiKey: apiKey,
    });
  }
}
