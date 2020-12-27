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

    /*
        <p>You have successfully created a new account on Let's Flix. Please proceed to the link below to validate it</p>
        <a href="${validationLink}" target="_blank">Validate</a>
    */

    // Step 2
    let mailOptions = {
        from: 'letsflix360@gmail.com', // TODO: email sender
        to: email, // TODO: email receiver
        subject: "Let's Flix Account Validation",
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f4f4f4"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr class="gmail-fix" height="0">
                    <td>
                        <table width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                            <tbody>
                                <tr>
                                    <td cellpadding="0" cellspacing="0" border="0" style="line-height: 1px; min-width: 600px;" height="0"><img src="https://esputnik.com/repository/applications/images/blank.gif" style="display: block; max-height: 0px; min-height: 0px; min-width: 600px; width: 600px;" alt width="600" height="1"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" esd-custom-block-id="7962" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p15t es-p15b es-p10r es-p10l" align="left">
                                                        <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="282" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="282" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="es-infoblock esd-block-text es-m-txt-c" align="left">
                                                                                        <p style="font-family: arial, helvetica\ neue, helvetica, sans-serif;">Put your preheader text here<br></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="278" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="278" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="right" class="es-infoblock esd-block-text es-m-txt-c">
                                                                                        <p><a href="https://viewstripo.email" class="view" target="_blank" style="font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';">View in browser</a></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-header" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" esd-custom-block-id="6339" align="center" bgcolor="#ff55a5" style="background-color: #ff55a5;">
                                        <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#ff55a5" style="background-color: #ff55a5;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p10b es-p10r es-p10l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="580" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" style="background-color: #ff55a5;" esd-custom-block-id="6340" bgcolor="#ff55a5" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table style="background-color: #ffffff; border-radius: 4px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p35t es-p5b es-p30r es-p30l" align="center">
                                                                                        <h1>It's time to join in with us</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-spacer es-p5t es-p5b es-p20r es-p20l" bgcolor="#ffffff" align="center" style="font-size:0">
                                                                                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table style="background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-m-txt-l es-p20t es-p15b es-p30r es-p30l" bgcolor="#ffffff" align="left">
                                                                                        <p>You&nbsp;have&nbsp;successfully&nbsp;created&nbsp;a&nbsp;new&nbsp;account&nbsp;on&nbsp;Let's&nbsp;Flix. Please&nbsp;proceed&nbsp;to&nbsp;the&nbsp;link&nbsp;below&nbsp;to&nbsp;validate&nbsp;it</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p15b es-p30r es-p30l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="540" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-button es-p40t es-p40b es-p10r es-p10l" align="center"><span class="es-button-border" style="background: #ff55a5; border-color: #66bb7f;"><a href="${validationLink}" class="es-button" target="_blank" style="border-width: 15px 25px; background: #ff55a5; border-color: #ff55a5;">Validate Account</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-spacer es-p10t es-p20b es-p20r es-p20l" align="center" style="font-size:0">
                                                                                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
        `, 
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