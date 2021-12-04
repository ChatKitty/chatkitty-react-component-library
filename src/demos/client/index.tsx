import ChatKitty from "chatkitty";

let client: ChatKitty;

const getDemoClient = async () => {
  if (!client) {
    client = new ChatKitty({
      host: "api.staging.chatkitty.com",
      apiKey: "afaac908-1db3-4b5c-a7ae-c040b9684403",
    });

    await client.startSession({
      username: "b2a6da08-88bf-4778-b993-7234e6d8a3ff",
    });
  }

  return client;
};

export { getDemoClient };
