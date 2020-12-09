const {
    STRIPE_API_KEY
} = require("../config/config");
const stripe = require('stripe')(STRIPE_API_KEY);

const subscribe = async (customerID, priceID) => {
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerID,
            items: [{
                price: priceID,
                quantity: 1
            }],
            cancel_at_period_end: true,
            expand: ['latest_invoice.payment_intent']
        });

        return subscription;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    subscribe
}