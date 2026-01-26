import { resendClient,sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";


export const sendWelcomeEmail = async(email,name,clientUrl)=>{ 
    const {data, error} = await resendClient.emails.send({
       from:`${sender.name} <${sender.email}>` ,
       to:email,
       subject:"Wlecome to Chatify",
       html:createWelcomeEmailTemplate(name,clientUrl),
    });
    if(error){
        console.error("Error sending welcome email:",error);
        throw new Error("Failed to send welecome email");
    }

    console.log("Welcome Email send successfully",data);
}

