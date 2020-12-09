const {
    generateCustomerValidationLink
} = require("../utils/utils");
const nodemailer = require('nodemailer');
const {
    STRIPE_API_KEY
} = require("../config/config");
const stripe = require('stripe')(STRIPE_API_KEY);

const sendValidationEmail = (req, customer) => {
    const {
        email
    } = req.body;
    const {
        _id
    } = customer;
    let validationLink = generateCustomerValidationLink(_id);

    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL || 'masterofshadow9a4@gmail.com',
            pass: process.env.PASSWORD || 'legendsneverdie'
        }
    });

    // Step 2
    let mailOptions = {
        from: 'masterofshadow9a4@gmail.com', // TODO: email sender
        to: email, // TODO: email receiver
        subject: "Let's Flix Account Validation",
        html: `<p>You have successfully created a new account on Let's Flix. Please proceed to the link below to validate it</p>
        <a href="${validationLink}" target="_blank">Validate</a>`,
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });
}

const stripePay = async (req, res) => {
    try {
        const {
            amount
        } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: {
                integration_check: 'accept_a_payment'
            }
        });

        res.json({
            client_secret: paymentIntent["client_secret"]
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getStripePaymentByID = async (req, res) => {
    try {
        const {
            paymentIntentID
        } = req.params;

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentID
        );

        res.json({
            paymentIntent
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

module.exports = {
    stripePay,
    getStripePaymentByID
}