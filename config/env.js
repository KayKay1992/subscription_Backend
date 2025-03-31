import { config } from "dotenv";

// Load environment variables based on NODE_ENV, with a fallback to 'development'
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Destructure and apply fallback to DB_URL in one step
export const { PORT = 3000, NODE_ENV = 'development', DB_URI = "mongodb+srv://kaykay:kenneth1992@cluster0.awzupzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" } = process.env;





