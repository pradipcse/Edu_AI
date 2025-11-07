import express from "express"
import { welcomeUser } from "../controllers/welcomeUser.js";

const router=express.Router();



router.get("/welcome",welcomeUser);


export default router;