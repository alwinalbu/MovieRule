
import server from "@/presentation/server";
import { db } from "@/_boot/db_config";

(async () => {
  try {
    server;
    await db()
      .then(() => console.log("Database connected successfully"))
      .catch((error: any) => {
        console.error(`Error while connecting to the database: ${error}`);
        process.exit(0);
      });

    process.on("SIGTERM", async () => {
      console.info("SIGTERM received");
    
      process.exit();
    });
  } catch (error: any) {
    console.log("Error on start up: ", error);
  } finally {
    process.on("SIGINT", async () => {
      console.log("\n Server is shutting down...");
      process.exit();
    });
  }
})();
