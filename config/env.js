import { config } from "dotenv";

// Load environment variables based on NODE_ENV, with a fallback to 'development'
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local.js` });

// Destructure and export PORT and NODE_ENV from process.env
export const { PORT =3000, NODE_ENV='development' } = process.env;