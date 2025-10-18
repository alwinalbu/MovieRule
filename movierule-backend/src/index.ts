// import server from "./presentation/server";
// import { db } from "./_boot/db_config";

// (async () => {
//   try {
//     // Connect DB
//     await db();
//     console.log("✅ Database connected successfully");

//     // Start server
//     const PORT = Number(process.env.PORT) || 4001;
//     server.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });

//     // Graceful shutdown
//     process.on("SIGTERM", async () => {
//       console.info("SIGTERM received");
//       process.exit();
//     });

//     process.on("SIGINT", async () => {
//       console.log("\n🛑 Server is shutting down...");
//       process.exit();
//     });
//   } catch (error: any) {
//     console.error("❌ Error on startup:", error);
//     process.exit(1);
//   }
// })();


import server from "./presentation/server";
import { db } from "./_boot/db_config";

(async () => {
  try {
    await db();
    console.log("✅ Database connected successfully");

    const PORT = Number(process.env.PORT) || 4001;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.on("SIGTERM", () => {
      console.info("SIGTERM received, shutting down gracefully");
      process.exit();
    });

    process.on("SIGINT", () => {
      console.log("\n🛑 Server interrupted, shutting down...");
      process.exit();
    });
  } catch (error) {
    console.error("❌ Error on startup:", error);
    process.exit(1);
  }
})();
