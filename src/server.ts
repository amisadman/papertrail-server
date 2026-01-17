import app from "./app";
import { config } from "./config/config";
import { db } from "./database/db";

const main = async () => {
  try {
    await db.connectDB();
    app.listen(config.port, () => {
      console.log(`Server is Running at: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
    await db.disConnectDB();
  }
};

main();
