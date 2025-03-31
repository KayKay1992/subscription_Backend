// Import Express
import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';

// Import the routes
import userRouter from './Routes/user.routes.js';
import subscriptionRuter from './Routes/subscription.routes.js';
import authRouter from './Routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';




// Initialize an Express app
const app = express();

//put the routes to use.
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRuter);
app.use('/api/v1/auth', authRouter);


// Define the root route to welcome the user
app.get('/', (req, res) => {
    res.send(`Subscription tracker Api is running on http://localhost:${PORT} in ${NODE_ENV} mode`)
})

// Start the server
app.listen(PORT, async () => {
    console.log(`Subscription tracker Api is running on http://localhost:${PORT} in ${NODE_ENV} mode`)
})

//connect to database
await connectToDatabase()


// Export the Express app for use in other files
export default app;