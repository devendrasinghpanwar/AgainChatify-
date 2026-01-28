import Message from "../models/message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");// find others all user except whose logged in 
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getAllContacts");
        res.status(500).json({ Message: "Server error" });
    }
}

export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id; // this is my id
        const { id: userToChatId } = req.params;

        const messages = await Message.find({

            // me and you 
            // first i became sender then i became reciever 

            $or: [ // or operator 
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json({ messages });
    } catch (error) {
        console.log("Error in getMessages controller", error.messages);
        res.status(500).json({ error: "Internal server error" });
        console.error("FULL ERROR:", error);
        console.error("TYPE:", typeof error);
        console.error("MESSAGE:", error?.message);
        res.status(500).json({ error: "Internal server error" });
    }
}



export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }

        if (senderId.equals(receiverId)) {
            return res
                .status(400)
                .json({ message: "Cannot send messages to yourself." });
        }

        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            // upload base64 to cloudinary 
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }


        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        // todo: send message in real time if user is online  - socket-io
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Intenral server error" });
    }
}

export const getChatPartners = async (req, res) => { // this function will teach how to get chatPartners
    try {
        // find all the messages where the logged-in user in either sender or receiver   
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        });

        // find  the chatPartners IDs from messages
        const chatPartnerIds = [...new Set(messages.map((msg) =>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        ))
        ];

        // finally select the chatPartners 
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        return res.status(200).json(chatPartners);

    } catch (error) {
        console.error("Error in getChatPartners: ", error.message);
        return res.status(500).json({ message: "Internal server error" });

    }

}