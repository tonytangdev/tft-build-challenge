import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log("Event: ", event);
  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
