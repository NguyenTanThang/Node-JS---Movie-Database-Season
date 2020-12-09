const Customer = require("../models/Customer");
const A_OR_AN = "a";
const APP_NAME = "customer";
const {
    addCustomerSchema,
    editCustomerSchema,
    getMessage
} = require("../utils/validator");
const {
    generateCustomerValidationLink
} = require("../utils/utils");
const {
    encrypt,
    compare
} = require("../utils/encryptor");
const {
    getStripeCustomerByID,
    createStripeCustomer,
    updateStripeCustomer,
    deleteStripeCustomer
} = require("../requests/customerStripeRequests");
const {
    CURRENT_CLIENT_URL
} = require("../config/config");
const nodemailer = require('nodemailer');

const sendValidationEmail = (req, customer) => {
    const {email} = req.body;
    const {_id} = customer;
    let validationLink = generateCustomerValidationLink(_id);

    // Step 1
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: "letsflix360@gmail.com",
            clientId: "582869229993-sep486l73m7h0lbdvgdikuep6lg1h4df.apps.googleusercontent.com",
            clientSecret: "2NavuGUamJCb-MtQbUS3q0ag",
            refreshToken: "1//045QWXDyTRlyeCgYIARAAGAQSNwF-L9IrFykn4KkSYvEQ56TjH3h-7trxBGv5anAhl69rLuajNjfALgh-ZNxrLKaBiknmq7tNdng",
            accessToken: "ya29.a0AfH6SMABo7TsTLS5GifEfqGmUpp5lvaXUiYFwc5MdvnmgnVIW75JWkEoQz3o6Dfx30wBZZsaT77Su0AS9Zc5GXnx4D8Id_1i9T-uWBQKzj5H7KBPnDQurklbDOgy-G2OVtQ-7kU7cOqcLf_1T8v6UmrFgokJpCukxg0"
        }
    });

    // Step 2
    let mailOptions = {
        from: 'letsflix360@gmail.com', // TODO: email sender
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

const customerLogin = async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body;

        const validation = addCustomerSchema.validate({
            email,
            password
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedCustomer = await Customer.findOne({
            email
        });

        if (!existedCustomer || !compare(password, existedCustomer.password)) {
            return res.json({
                success: false,
                message: `Invalid email or password`,
                status: 400
            })
        }
 
        if (!existedCustomer.validated) {
            return res.json({
                success: false,
                message: `This account has not been validated`,
                status: 400
            })
        }

        let stripeCustomer = await getStripeCustomerByID(existedCustomer.stripeCustomerID)

        const returnedCustomerItem = {
            customerItem: existedCustomer,
            stripeCustomer
        }

        res.json({
            success: true,
            data: returnedCustomerItem,
            message: `Successfully logged in`,
            status: 200
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

const customerSignup = async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body;

        const validation = addCustomerSchema.validate({
            email,
            password
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedCustomer = await Customer.findOne({
            email
        });

        if (existedCustomer) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} with this email is already existed`,
                status: 400
            })
        }

        const stripeCustomer = await createStripeCustomer({
            email
        });

        password = encrypt(password);
        let customer = await new Customer({
            email,
            password,
            stripeCustomerID: stripeCustomer.id
        }).save();

        const returnedCustomerItem = {
            customerItem: customer,
            stripeCustomer
        }

        sendValidationEmail(req, customer);

        res.json({
            success: true,
            data: returnedCustomerItem,
            message: `Successfully signed up`,
            status: 200
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

const validateCustomer = async (req, res) => {
    try {
        let {
            customerID
        } = req.params;
        await Customer.findByIdAndUpdate(customerID, {
            validated: true
        });

        res.redirect(CURRENT_CLIENT_URL);
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

const getAllCustomers = async (req, res) => {
    try {
        let customers = await Customer.find();

        for (let index = 0; index < customers.length; index++) {
            let customerItem = customers[index];
            const stripeCustomer = await getStripeCustomerByID(customerItem.stripeCustomerID);
            customers[index] = {
                customerItem,
                stripeCustomer
            };
        }

        res.json({
            success: true,
            data: customers,
            length: customers.length,
            status: 200
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

const getCustomerByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let customer = await Customer.findById(id);

        if (!customer) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let stripeCustomer = await getStripeCustomerByID(customer.stripeCustomerID);

        const returnedCustomerItem = {
            customerItem: customer,
            stripeCustomer
        }

        res.json({
            success: true,
            data: returnedCustomerItem,
            status: 200
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

const addCustomer = async (req, res) => {
    try {
        let {
            email,
            password,
            validated
        } = req.body;
        const validation = addCustomerSchema.validate({
            email,
            password
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedCustomer = await Customer.findOne({
            email
        });

        if (existedCustomer) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const stripeCustomer = await createStripeCustomer({
            email
        });

        password = encrypt(password);
        let customer = await new Customer({
            email,
            password,
            validated,
            stripeCustomerID: stripeCustomer.id
        }).save();

        const returnedCustomerItem = {
            customerItem: customer,
            stripeCustomer
        }

        res.json({
            success: true,
            data: returnedCustomerItem,
            message: `Successfully created ${A_OR_AN} ${APP_NAME}`,
            status: 200
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

const editCustomer = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            email,
            password,
            validated
        } = req.body;

        const validation = editCustomerSchema.validate({
            email,
            password
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedCustomer = await Customer.findById(id);

        if (!existedCustomer) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let duplicatedCustomer = await Customer.findOne({
            email
        });

        if (duplicatedCustomer && duplicatedCustomer._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const last_modified_date = Date.now();
        let customer;

        if (password) {
            password = encrypt(password);
            customer = await Customer.findByIdAndUpdate(id, {
                email,
                validated,
                password,
                last_modified_date
            });
        } else {
            customer = await Customer.findByIdAndUpdate(id, {
                email,
                validated,
                last_modified_date
            });
        }

        const stripeCustomer = await updateStripeCustomer(customer.stripeCustomerID, {
            email
        })

        const returnedCustomerItem = {
            customerItem: customer,
            stripeCustomer
        }

        res.json({
            success: true,
            data: returnedCustomerItem,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`,
            status: 200
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

const deleteCustomer = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let existedCustomer = await Customer.findById(id);

        if (!existedCustomer) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const customer = await Customer.findByIdAndDelete(id);
        const stripeCustomer = await deleteStripeCustomer(customer.stripeCustomerID);

        const returnedCustomerItem = {
            customerItem: customer,
            stripeCustomer
        }

        res.json({
            success: true,
            data: returnedCustomerItem,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`,
            status: 200
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
    getAllCustomers,
    getCustomerByID,
    addCustomer,
    editCustomer,
    deleteCustomer,
    validateCustomer,
    customerSignup,
    customerLogin
}