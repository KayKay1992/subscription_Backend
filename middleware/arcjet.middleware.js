import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    // Protect this request and tell us your decision if it should be denied or allowed.
    const decision = await aj.protect(req, {requested: 1});

    // If the decision is denied, check the reason.
    if (decision.isDenied()) {
      console.log('Denial Reason:', decision.reason);  // Log the denial reason for debugging

      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too many requests, please try again later." });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected." });
      }

      // Handle any other denial reasons that aren't rate-limited or bot-related.
      return res.status(403).json({ message: `Access denied: ${decision.reason}` });
    }

    // Proceed if the request is allowed.
    next();
    
  } catch (error) {
    console.error(`ArcJet middleware error: ${error}`);
    next(error);  // Pass the error to the next error-handling middleware
  }
};

export default arcjetMiddleware;
