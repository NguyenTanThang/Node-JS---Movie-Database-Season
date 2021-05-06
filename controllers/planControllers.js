const Plan = require("../models/Plan");
const A_OR_AN = "a";
const APP_NAME = "plan";
const {addPlanSchema, getMessage} = require("../utils/validator");
const {usdToVnd} = require("../constants/subscriptionData");
const {getPaypalAuthorizationToken} = require("../requests/paypalRequests");

const getPlanByPrice = async (req, res) => {
    try {
        let {
            price,
            priceVND
        } = req.query;
        
        let plan = await Plan.findOne({price});

        if (!plan) {
            plan = await Plan.findOne({priceVND});
        }

        if (!plan) {
            return res.json({
                success: true,
                data: null,
                status: 200,
                message: `No ${APP_NAME} match this amount`
            })
        }
 
        res.json({
            success: true,
            data: plan,
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

const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find().sort({'price': 1});

        res.json({
            success: true,
            data: plans,
            length: plans.length,
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

const getPlanByID = async (req, res) => {
    try {
        const {id} = req.params;
        const plan = await Plan.findById(id);

        if (!plan) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: plan,
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

const addPlan = async (req, res) => {
    try {
        let {name, price, description, durationInDays} = req.body;
        const validation = addPlanSchema.validate({name, price, description, durationInDays});

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedPlan = await Plan.findOne({name});

        if (existedPlan) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const plan = await new Plan({
            name, price, priceVND: usdToVnd(price), description, durationInDays,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: plan,
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

const editPlan = async (req, res) => {
    try {
        const {id} = req.params;
        let {name, price, description, durationInDays} = req.body;

        const validation = addPlanSchema.validate({name, price, description, durationInDays});

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedPlan = await Plan.findById(id);

        if (!existedPlan) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let duplicatedPlan = await Plan.findOne({name});

        if (duplicatedPlan && duplicatedPlan._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const last_modified_date = Date.now();
        const plan = await Plan.findByIdAndUpdate(id, {
            name, price, priceVND: usdToVnd(price), description, durationInDays, last_modified_date
        });

        res.json({
            success: true,
            data: plan,
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

const deletePlan = async (req, res) => {
    try {
        const {id} = req.params;
        let existedPlan = await Plan.findById(id);

        if (!existedPlan) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const plan = await Plan.findByIdAndDelete(id);

        res.json({
            success: true,
            data: plan,
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
    getAllPlans,
    getPlanByID,
    addPlan,
    editPlan,
    deletePlan,
    getPlanByPrice
}