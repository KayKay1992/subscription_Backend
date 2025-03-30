// Import Express
import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';


// Initialize an Express app
const app = express();


// Define the root route to welcome the user
app.get('/', (req, res) => {
    res.send(`Subscription tracker Api is running on http://localhost:${PORT} in ${NODE_ENV} mode`)
})



// Start the server
app.listen(PORT, () => {
    console.log(`Subscription tracker Api is running on http://localhost:${PORT} in ${NODE_ENV} mode`)
})


// Export the Express app for use in other files
export default app;