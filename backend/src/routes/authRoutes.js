import express from "express";
import { signup,login,logout,updateProfile} from "../controller/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login",login);

router.post("/logout",logout);


router.put('/update-profile',protectRoute,updateProfile);
router.get('/check',protectRoute,(req,res)=>res.status(200).json(req.user));// we will request the user after checking 
export default router;
