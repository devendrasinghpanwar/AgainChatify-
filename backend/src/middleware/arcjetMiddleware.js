import { request } from "express";
import aj from "../lib/arcjet.js";

import { isSpoofedBot } from "@arcjet/inspect"


export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req,{requested:1}); // depending on request get us a decision , it's kind of middleware
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "rate limit exceeded, please try again later " })
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "bot access denied" })
            }
            else {
                res.status(403).json({ message: "access denied by security policy" })
            }

        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"Spoofed bot deteced",
                message:"Malicious bot activity detected"
            })
        }

        next();

    } catch (error) {
        console.error("Arcjet Protection Error", error);
        next();
    }
}



/*

import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    // ✅ REQUIRED for rate limiting
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded, please try again later",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied",
        });
      }

      return res.status(403).json({
        message: "Access denied by security policy",
      });
    }

    if (decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);
    next();
  }
};


*/