import { z } from "zod";
import { createHash } from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

const { TFT_COMPOSITION_TABLE_NAME, REGION } = process.env;

const ChampionSchema = z.object({
  name: z.string(),
  lvl: z.number(),
  items: z.array(z.string()),
  board_row_position: z.number(),
});

const EventSchema = z.object({
  composition_name: z.string(),
  champions: z.array(ChampionSchema),
});

const dynamoDbClient = new DynamoDBClient({ region: REGION });

const handler = async function (event: unknown) {
  const parsedEvent = EventSchema.parse(event);

  const id = generateIdFromJson(parsedEvent);

  const command = new PutCommand({
    TableName: TFT_COMPOSITION_TABLE_NAME,
    Item: {
      id,
      ...parsedEvent,
    },
  });

  await dynamoDbClient.send(command);

  return { id };
};

function generateIdFromJson(jsonObject: JsonValue): string {
  const jsonString = JSON.stringify(sortObjectKeys(jsonObject));

  const hash = createHash("sha256");
  hash.update(jsonString);
  return hash.digest("hex");
}

function sortObjectKeys(obj: JsonValue): JsonValue {
  if (Array.isArray(obj)) {
    return obj.map((item) => sortObjectKeys(item));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((result: JsonObject, key: string) => {
        const value = (obj as JsonObject)[key];
        result[key] = sortObjectKeys(value);
        return result;
      }, {} as JsonObject);
  }
  return obj;
}

export { handler };
