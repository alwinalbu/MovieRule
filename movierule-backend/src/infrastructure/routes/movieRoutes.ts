import { jwtMiddleware } from '../../utils/middlewares/VerifyToken';
import { getSecureVideoURL } from '../../presentation/movies/controllers/getSecureVideoURL';
import express from 'express';
import { generateUploadSignature } from '../../presentation/movies/controllers/generateUploadSignature';
import { uploadVideo } from '../../presentation/movies/controllers/uploadVideo';

const router = express.Router();

router.post("/upload-video/:id",jwtMiddleware(["admin"]),uploadVideo);


router.get("/movies/:id/secure-url",jwtMiddleware(["user"]), getSecureVideoURL);

// router.get("/cloudinary/signature",generateUploadSignature);

export default router;