// Import Express
import express from 'express';

// Initialize an Express app
const app = express();


// Define the root route to welcome the user
app.get('/', (req, res) => {
    res.send('Welcome to the subscription Tracker Api')
})

// Start the server
app.listen(3000, () => {
    console.log('Subscription Tracker Api is running on http://localhost:3000')
})


// Export the Express app for use in other files
export default app;