import express from 'express';
import { getAllContacts,getMessageByUserId,sendMessage,getChatPartners} from '../controller/messageController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import { arcjetProtection } from '../middleware/arcjetMiddleware.js';
const router =express.Router();

// the middlewares execute in order - so requests get rate limited first , then authenticated, this is actually more efficient since unathenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use( arcjetProtection,protectRoute); 

router.get("/contacts", getAllContacts); // route is used for getting all of the contracts
router.get("/chats",getChatPartners);  // route is used for getting all of chat from partners 
router.get("/:id",getMessageByUserId); // route is used for getting all of message using Id 
router.post("/send/:id",sendMessage); //  route is used for sendMessage to user by using Id  


export  default router;  


