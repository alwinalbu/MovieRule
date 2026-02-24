import { submitContactController } from "../../presentation/user/controllers/contactController";
import { Router } from "express";


const router = Router();

router.post("/", submitContactController);

export default router;
