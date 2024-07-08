import express, { Application,Request,Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dependencies } from "@/_boot/dependencies";
import cors from "cors";
import { theaterDependencies } from "@/_boot/theaterDependencies";
import { theaterRoutes,routes,adminRoutes } from "@/infrastructure/routes";
import { adminDependencies } from "@/_boot/adminDependencies";


dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [process.env.CLIENT_URL!];

const clientUrl = process.env.CLIENT_URL;

console.log(`Client URL: ${clientUrl}`);

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/",routes(dependencies));
app.use("/theater", theaterRoutes(theaterDependencies));
app.use('/admin',adminRoutes(adminDependencies))

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Api Not found" });
});


 app.listen(PORT, () => {
   console.log(`connected to auth service defaultly at ${PORT}`);
 });

 export default app;