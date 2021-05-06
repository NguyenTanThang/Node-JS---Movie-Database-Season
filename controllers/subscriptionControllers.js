const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");
const A_OR_AN = "a";
const APP_NAME = "subscription";
const {
    addSubscriptionSchema,
    editSubscriptionSchema,
    getMessage
} = require("../utils/validator");
const {
    dateToMili,
    miliToDate,
    convertDaysIntoMili
} = require("../utils/utils");

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
        .populate('customerID')
        .populate('planID')
        .exec();

        res.json({
            success: true,
            data: subscriptions,
            length: subscriptions.length,
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

const getSubscriptionByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const subscription = await Subscription.findById(id);

        if (!subscription) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: subscription,
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

const getSubscriptionByCustomerID = async (req, res) => {
    try {
        const {
            customerID
        } = req.params;
        console.log(customerID);
        const subscription = await Subscription.find({
            customerID
        })
        .populate('customerID')
        .populate('planID')
        .exec();

        res.json({
            success: true,
            data: subscription,
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

const getSubscriptionStatusByCustomerID = async (req, res) => {
    try {
        const {
            customerID
        } = req.params;
        const subscription = await Subscription.find({customerID}).sort([['created_date', 'descending']]);

        if (subscription.length === 0) {
            return res.json({
                success: true,
                data: "non-active",
                subscription,
                status: 200
            })
        }

        if (subscription[0].ended_date < Date.now()) {
            return res.json({
                success: true,
                data: "non-active",
                subscription,
                status: 200
            })
        }

        res.json({
            success: true,
            data: "active",
            subscription,
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

const addSubscription = async (req, res) => {
    try {
        let {
            customerID,
            planID
        } = req.body;
        const validation = addSubscriptionSchema.validate({
            customerID,
            planID
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedPlan = await Plan.findById(planID);
        const durationInMili = convertDaysIntoMili(existedPlan.durationInDays) + dateToMili(Date.now());

        const subscription = await new Subscription({
            customerID,
            planID,
            ended_date: miliToDate(durationInMili),
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: subscription,
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

const editSubscription = async (req, res) => {
    try {
        const {id} = req.params;
        let {
            planID,
            ended_date
        } = req.body;
        const validation = editSubscriptionSchema.validate({
            ended_date,
            planID
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedSubscription = await Subscription.findById(id);

        if (!existedSubscription) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const subscription = await Subscription.findById(id, {
            planID,
            ended_date,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: subscription,
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

const deleteSubscription = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let existedSubscription = await Subscription.findById(id);

        if (!existedSubscription) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const subscription = await Subscription.findByIdAndDelete(id);

        res.json({
            success: true,
            data: subscription,
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
    getAllSubscriptions,
    getSubscriptionByID,
    addSubscription,
    editSubscription,
    deleteSubscription,
    getSubscriptionStatusByCustomerID,
    getSubscriptionByCustomerID
}