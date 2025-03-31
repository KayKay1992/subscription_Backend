import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory (needed for ES modules)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
config({ 
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV || 'development'}.local`)
});

// Validate required variables
if (!process.env.DB_URI) {
  throw new Error("DB_URI must be defined in environment variables");
}

export const { 
  PORT = 3000, 
  NODE_ENV = 'development',
  DB_URI, // No fallback - must be in .env file
  JWT_SECRET, // Only for development
  JWT_EXPIRES_IN = '3d' 
} = process.env;