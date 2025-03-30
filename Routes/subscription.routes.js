import { Router } from "express";

const subscriptionRouter = Router();

//To get the subscription
subscriptionRouter.get('/', (req, res) =>res.send({title: 'Get all subscriptions'}))

//To get subscription by id
subscriptionRouter.get('/:id', (req, res) => res.send({title: `Get subscription details`}))

//To create a new subscription
subscriptionRouter.post('/', (req, res) => res.send({title: 'Create a new subscription'}))

//To update a subscription
subscriptionRouter.put('/:id', (req, res) => res.send({title: `Update subscription details`}))

//To delete a subscription
subscriptionRouter.delete('/:id', (req, res) => res.send({title: `Delete subscription details`}))

//get all subscriptions belonging to a specific user
subscriptionRouter.get('/user/:id', (req, res) => res.send({title: `Get all subscriptions for user`}))

//cancel a user subscription
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: `Cancel user subscription`}))

//get us all upcomming renewals
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: `Get all upcoming renewals`}))


export default subscriptionRouter