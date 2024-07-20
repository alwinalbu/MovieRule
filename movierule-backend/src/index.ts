
import server from "@/presentation/server";
import { db } from "@/_boot/db_config";

import { Admin } from "./infrastructure/database/mogodb/models/adminSchema";

const insertSampleAdmin = async () => {
  // Sample admin data
  const sampleAdminData = {
    username: "AdminUser",
    email: "admin@gmail.com",
    password:"Admin1234@",
    usersList: [],
    theaterList: [],
    movies: [],
    streamingMovies: [],
  };

  try {
    const existingAdmin = await Admin.findOne({ email: sampleAdminData.email });
    if (!existingAdmin) {
      const newAdmin = new Admin(sampleAdminData);
      await newAdmin.save();
      console.log("Sample admin inserted:", newAdmin);
    } else {
      console.log("Admin with this email already exists.");
    }
  } catch (error) {
    console.error("Failed to insert sample admin:", error);
  }
};

(async () => {
  try {
    server;
    await db()
      .then(() => console.log("Database connected successfully"))
      .catch((error: any) => {
        console.error(`Error while connecting to the database: ${error}`);
        process.exit(0);
      });

    // Insert sample admin after successful database connection
    // await insertSampleAdmin();

    process.on("SIGTERM", async () => {
      console.info("SIGTERM received");
      // Perform any necessary cleanup here
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
