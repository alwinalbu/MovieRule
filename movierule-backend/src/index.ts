import server from "./presentation/server";
import { db } from "./_boot/db_config";

(async () => {
  try {
    // Connect DB
    await db();
    console.log("✅ Database connected successfully");

    // Start server
    const PORT = Number(process.env.PORT) || 4001;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.info("SIGTERM received");
      process.exit();
    });

    process.on("SIGINT", async () => {
      console.log("\n🛑 Server is shutting down...");
      process.exit();
    });
  } catch (error: any) {
    console.error("❌ Error on startup:", error);
    process.exit(1);
  }
})();


