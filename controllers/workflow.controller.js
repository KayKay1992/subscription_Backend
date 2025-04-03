//because upstash was written with common js import like dis wont work directly..
// import { serve } from "@upstash/workflow/express";

//so we we import with this 3 lines of code.
import {createRequire} from "module"
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')

import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";


//Arrays of number of days we want to be reminded.
const REMINDERS =[7, 5, 3, 1]


//creating function that is responsible for sending reminders.
export const sendReminders = serve(async(context)=>{
    //extract subscription id from a specific workflow.
    const {subscriptionId} = context.requestPayload;
    //fetch the details of the subscription
    const subscription = await fetchSubscription(context, subscriptionId);


    //check if there is no subscription or if subscription is not active
    if(!subscription ||subscription.status !== 'active') return
    
    //if it is active we check when is the renewal day.insatll dayjs package for this npm i dayjs.
    const renewalDate = dayjs(subscription.renewalDate);

    //check if renewal date is before.
    if(renewalDate.isBefore(dayjs())) return;
    
    //Now send a list of different reminders using for loop
    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        //if the reminder day is after we put it to sleep.
        if(reminderDate.isAfter(dayjs())){
            //we create a new sleep and trigger function outside and call it here.
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before renewal`, reminderDate); 
        }
        else{
            //if the reminder day is before we trigger it.
            await triggerReminder(context, `Reminder ${daysBefore} days before renewal`);
        }
    }
})


//writing the fetchSubscription function
const fetchSubscription = async(context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}

//sleep functionality
const sleepUntilReminder = async(context, label, date) => {
    //this will pause the workflow until the given date.
    await context.sleepUntil(label, date.toDate());
}

//trigger reminder functionality. 
const triggerReminder = async(context, label) => {
    //this will trigger a workflow with the given label.
   return await context.run(label, () => {
       //do some action here.
       console.log(`Triggering ${label} reminder`)
       //you can run any logic here like send email, push notifications, sms, etc
   });
}