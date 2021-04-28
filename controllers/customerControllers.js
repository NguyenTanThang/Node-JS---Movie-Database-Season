const Customer = require("../models/Customer");
const Comment = require("../models/Comment");
const ChangePasswordToken = require("../models/ChangePasswordToken");
const A_OR_AN = "a";
const APP_NAME = "customer";
const {
  addCustomerSchema,
  editCustomerSchema,
  getMessage,
  loginSchema
} = require("../utils/validator");
const {
  generateCustomerValidationLink,
  generateChangePasswordToken,
  getDaysDiffVerbose
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
  createSession,
  getAllSessionsByCustomerID
} = require("../requests/sessionRequests");
const {
  CURRENT_CLIENT_URL
} = require("../config/config");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              
              /*All the styling goes here*/
              
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; 
              }
        
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; 
              }
        
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; 
              }
        
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
        
              .body {
                background-color: #f6f6f6;
                width: 100%; 
              }
        
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; 
              }
        
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px; 
              }
        
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%; 
              }
        
              .wrapper {
                box-sizing: border-box;
                padding: 20px; 
              }
        
              .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
              }
        
              .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%; 
              }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; 
              }
        
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px; 
              }
        
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; 
              }
        
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px; 
              }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; 
              }
        
              a {
                color: #3498db;
                text-decoration: underline; 
              }
        
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; 
              }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; 
              }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; 
              }
        
              .btn-primary table td {
                background-color: #3498db; 
              }
        
              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; 
              }
        
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; 
              }
        
              .first {
                margin-top: 0; 
              }
        
              .align-center {
                text-align: center; 
              }
        
              .align-right {
                text-align: right; 
              }
        
              .align-left {
                text-align: left; 
              }
        
              .clear {
                clear: both; 
              }
        
              .mt0 {
                margin-top: 0; 
              }
        
              .mb0 {
                margin-bottom: 0; 
              }
        
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; 
              }
        
              .powered-by a {
                text-decoration: none; 
              }
        
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0; 
              }
        
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; 
                }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; 
                }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; 
                }
                table[class=body] .content {
                  padding: 0 !important; 
                }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; 
                }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; 
                }
                table[class=body] .btn table {
                  width: 100% !important; 
                }
                table[class=body] .btn a {
                  width: 100% !important; 
                }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; 
                }
              }
        
              /* -------------------------------------
                  PRESERVE THESE STYLES IN THE HEAD
              ------------------------------------- */
              @media all {
                .ExternalClass {
                  width: 100%; 
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; 
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; 
                }
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                  font-size: inherit;
                  font-family: inherit;
                  font-weight: inherit;
                  line-height: inherit;
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important; 
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; 
                } 
              }
        
            </style>
          </head>
          <body class="">
            <span class="preheader">Welcome ${email}, we are glad to see new people joining in.</span>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <p>Hi there,</p>
                                <p>You just have one more thing to do which is validate the email. Please click the button below to validate it</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td> <a href="${validationLink}" target="_blank">validate Email</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>Once your email have been validated, you can login right away.</p>
                                <p>Thank you! Hope you have a good time using our application.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                            <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
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

const sendResetPasswordEmail = async (customer) => {
  const {
    _id,
    email
  } = customer;
  let token = generateChangePasswordToken();

  const changePasswordToken = await new ChangePasswordToken({
    customerID: _id,
    token,
    expiryDate: Date.now() + (1000 * 60 * 60 * 24)
  }).save();

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
    subject: "Let's Flix Password Reset",
    html: `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Simple Transactional Email</title>
          <style>
            /* -------------------------------------
                GLOBAL RESETS
            ------------------------------------- */
            
            /*All the styling goes here*/
            
            img {
              border: none;
              -ms-interpolation-mode: bicubic;
              max-width: 100%; 
            }
      
            body {
              background-color: #f6f6f6;
              font-family: sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 14px;
              line-height: 1.4;
              margin: 0;
              padding: 0;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%; 
            }
      
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%; }
              table td {
                font-family: sans-serif;
                font-size: 14px;
                vertical-align: top; 
            }
      
            /* -------------------------------------
                BODY & CONTAINER
            ------------------------------------- */
      
            .body {
              background-color: #f6f6f6;
              width: 100%; 
            }
      
            /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
            .container {
              display: block;
              margin: 0 auto !important;
              /* makes it centered */
              max-width: 580px;
              padding: 10px;
              width: 580px; 
            }
      
            /* This should also be a block element, so that it will fill 100% of the .container */
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px; 
            }
      
            /* -------------------------------------
                HEADER, FOOTER, MAIN
            ------------------------------------- */
            .main {
              background: #ffffff;
              border-radius: 3px;
              width: 100%; 
            }
      
            .wrapper {
              box-sizing: border-box;
              padding: 20px; 
            }
      
            .content-block {
              padding-bottom: 10px;
              padding-top: 10px;
            }
      
            .footer {
              clear: both;
              margin-top: 10px;
              text-align: center;
              width: 100%; 
            }
              .footer td,
              .footer p,
              .footer span,
              .footer a {
                color: #999999;
                font-size: 12px;
                text-align: center; 
            }
      
            /* -------------------------------------
                TYPOGRAPHY
            ------------------------------------- */
            h1,
            h2,
            h3,
            h4 {
              color: #000000;
              font-family: sans-serif;
              font-weight: 400;
              line-height: 1.4;
              margin: 0;
              margin-bottom: 30px; 
            }
      
            h1 {
              font-size: 35px;
              font-weight: 300;
              text-align: center;
              text-transform: capitalize; 
            }
      
            p,
            ul,
            ol {
              font-family: sans-serif;
              font-size: 14px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 15px; 
            }
              p li,
              ul li,
              ol li {
                list-style-position: inside;
                margin-left: 5px; 
            }
      
            a {
              color: #3498db;
              text-decoration: underline; 
            }
      
            /* -------------------------------------
                BUTTONS
            ------------------------------------- */
            .btn {
              box-sizing: border-box;
              width: 100%; }
              .btn > tbody > tr > td {
                padding-bottom: 15px; }
              .btn table {
                width: auto; 
            }
              .btn table td {
                background-color: #ffffff;
                border-radius: 5px;
                text-align: center; 
            }
              .btn a {
                background-color: #ffffff;
                border: solid 1px #3498db;
                border-radius: 5px;
                box-sizing: border-box;
                color: #3498db;
                cursor: pointer;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
                margin: 0;
                padding: 12px 25px;
                text-decoration: none;
                text-transform: capitalize; 
            }
      
            .btn-primary table td {
              background-color: #3498db; 
            }
      
            .btn-primary a {
              background-color: #3498db;
              border-color: #3498db;
              color: #ffffff; 
            }
      
            /* -------------------------------------
                OTHER STYLES THAT MIGHT BE USEFUL
            ------------------------------------- */
            .last {
              margin-bottom: 0; 
            }
      
            .first {
              margin-top: 0; 
            }
      
            .align-center {
              text-align: center; 
            }
      
            .align-right {
              text-align: right; 
            }
      
            .align-left {
              text-align: left; 
            }
      
            .clear {
              clear: both; 
            }
      
            .mt0 {
              margin-top: 0; 
            }
      
            .mb0 {
              margin-bottom: 0; 
            }
      
            .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0; 
            }
      
            .powered-by a {
              text-decoration: none; 
            }
      
            hr {
              border: 0;
              border-bottom: 1px solid #f6f6f6;
              margin: 20px 0; 
            }
      
            /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            @media only screen and (max-width: 620px) {
              table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important; 
              }
              table[class=body] p,
              table[class=body] ul,
              table[class=body] ol,
              table[class=body] td,
              table[class=body] span,
              table[class=body] a {
                font-size: 16px !important; 
              }
              table[class=body] .wrapper,
              table[class=body] .article {
                padding: 10px !important; 
              }
              table[class=body] .content {
                padding: 0 !important; 
              }
              table[class=body] .container {
                padding: 0 !important;
                width: 100% !important; 
              }
              table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important; 
              }
              table[class=body] .btn table {
                width: 100% !important; 
              }
              table[class=body] .btn a {
                width: 100% !important; 
              }
              table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important; 
              }
            }
      
            /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            @media all {
              .ExternalClass {
                width: 100%; 
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%; 
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important; 
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
              .btn-primary table td:hover {
                background-color: #34495e !important; 
              }
              .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important; 
              } 
            }
      
          </style>
        </head>
        <body class="">
          <span class="preheader">Welcome ${email}, we are glad to see new people joining in.</span>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
      
                  <!-- START CENTERED WHITE CONTAINER -->
                  <table role="presentation" class="main">
      
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <p>Hi there,</p>
                              <p>Seem like you forgot your password. Please click the button below to reset it</p>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                <tbody>
                                  <tr>
                                    <td align="left">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td> <a href="${CURRENT_CLIENT_URL}reset-password/${token}" target="_blank">
                                              Reset Password
                                            </a> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p>Once you clicked on the button, you will be transferred to the change password page right away.</p>
                              <p>Thank you! Hope you have a good time using our application.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
      
                  <!-- END MAIN CONTENT AREA -->
                  </table>
                  <!-- END CENTERED WHITE CONTAINER -->
      
                  <!-- START FOOTER -->
                  <div class="footer">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="content-block">
                          <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                          <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block powered-by">
                          Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
      
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
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

    const validation = loginSchema.validate({
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

    let stripeCustomer = await getStripeCustomerByID(existedCustomer.stripeCustomerID);
    
    const token = jwt.sign({
      customerID: existedCustomer._id
    }, process.env.JWT_SECRET);

    const sessions = await getAllSessionsByCustomerID(existedCustomer._id);

    if (sessions.length >= 1) {
      return res.json({
        success: false,
        data: null,
        message: `This account has reached the maximum number of concurrent users. Make sure that you logout from other devices`,
        status: 200
      })
    }

    const session = await createSession(token, existedCustomer._id);

    const returnedCustomerItem = {
      customerItem: existedCustomer,
      stripeCustomer,
      token,
      session
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
      username,
      email,
      password
    } = req.body;

    const validation = addCustomerSchema.validate({
      username,
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
      username,
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

const resetPasswordTokenRequest = async (req, res) => {
  try {
    let {
      email
    } = req.body;
    const customer = await Customer.findOne({
      email
    });

    if (!customer) {
      return res.json({
        success: false,
        data: null,
        message: `This email does not exist`,
        status: 400
      })
    }

    await sendResetPasswordEmail(customer);

    return res.json({
      success: true,
      data: null,
      message: `Reset password email has been sent`,
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

const changePassword = async (req, res) => {
  try {
    let {
      customerID,
    } = req.params;
    let {
      email,
      newPassword,
      oldPassword
    } = req.body;

    let customer = await Customer.findOne({_id: customerID, email});

    if (!compare(oldPassword, customer.password)) {
      return res.json({
        success: false,
        data: null,
        message: `You have enterred the incorrect current password`,
        status: 400
      })
    }

    let password = encrypt(newPassword);

    customer = await Customer.findByIdAndUpdate(customerID, {
      password
    });

    return res.json({
      success: true,
      data: customer,
      message: `Successfully changed the password`,
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

const resetPassword = async (req, res) => {
  try {
    let {
      token,
    } = req.params;
    let {
      newPassword
    } = req.body;

    const resetPasswordToken = await ChangePasswordToken.findOne({
      token
    });

    let password = encrypt(newPassword);

    const {
      customerID,
      expiryDate
    } = resetPasswordToken;

    if (getDaysDiffVerbose(expiryDate) <= 0) {
      return res.json({
        success: false,
        data: null,
        message: `Token has expired`,
        status: 400
      })
    }

    const customer = await Customer.findByIdAndUpdate(customerID, {
      password
    });

    res.json({
      success: true,
      data: customer,
      message: `Successfully resetted the password`,
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

const getResetPasswordToken = async (req, res) => {
  try {
    let {
      token,
    } = req.params;

    const resetPasswordToken = await ChangePasswordToken.findOne({
      token
    });

    const {
      customerID,
      expiryDate
    } = resetPasswordToken;

    console.log(resetPasswordToken.expiryDate);
    console.log(getDaysDiffVerbose(resetPasswordToken.expiryDate))

    if (getDaysDiffVerbose(resetPasswordToken.expiryDate) <= 0) {
      return res.json({
        success: false,
        data: null,
        message: `Token has expired`,
        status: 400
      })
    }

    const customer = await Customer.findById(customerID);

    return res.json({
      success: true,
      data: customer,
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
      username,
      email,
      password,
      validated
    } = req.body;
    const validation = addCustomerSchema.validate({
      username,
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
      username,
      email,
      password,
      validated,
      stripeCustomerID: stripeCustomer.id,
      created_date: Date.now(),
      last_modified_date: Date.now()
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
      username,
      avatar,
      email,
      password,
      validated
    } = req.body;

    const validation = editCustomerSchema.validate({
      username,
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
        username,
        avatar,
        email,
        validated,
        avatar,
        password,
        last_modified_date
      });
    } else {
      customer = await Customer.findByIdAndUpdate(id, {
        username,
        avatar,
        email,
        avatar,
        validated,
        last_modified_date
      });
    }

    const stripeCustomer = await updateStripeCustomer(customer.stripeCustomerID, {
      email
    })

    customer = await Customer.findById(id);

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
    const comments = await Comment.find({
      customerID: customer._id
    });

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      await Comment.findByIdAndDelete(comment._id);
    }

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
  customerLogin,
  resetPasswordTokenRequest,
  changePassword,
  resetPassword,
  getResetPasswordToken
}