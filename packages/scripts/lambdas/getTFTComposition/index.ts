const handler = async function (event: unknown) {
  console.log("Event: ", event);
  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};

export { handler };
