const {STRIPE_API_KEY} = require("../config/config");
const stripe = require('stripe')(STRIPE_API_KEY);

const getAllStripeCustomers = async () => {
    try {
        const customers = await stripe.customers.list({
            limit: 10000,
        });
    
        return customers;
    } catch (error) {
        console.log(error);
    }
}

const getStripeCustomerByID = async (customerID) => {
    try {
        const customer = await stripe.customers.retrieve(
            customerID
        );

        return customer;
    } catch (error) {
        console.log(error);
    }
}

const createStripeCustomer = async (newCustomer) => {
    try {
        const {email} = newCustomer;
        const customer = await stripe.customers.create({
            email
        });

        return customer;
    } catch (error) {
        console.log(error);
    }
}

const updateStripeCustomer = async (customerID, updatedCustomer) => {
    try {
        const {email} = updatedCustomer;
        const customer = await stripe.customers.update(customerID, {
            email
        });

        return customer;
    } catch (error) {
        console.log(error);
    }
}

const deleteStripeCustomer = async (customerID) => {
    try {
        const customer = await stripe.customers.del(customerID);

        return customer;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllStripeCustomers,
    getStripeCustomerByID,
    createStripeCustomer,
    updateStripeCustomer,
    deleteStripeCustomer
}