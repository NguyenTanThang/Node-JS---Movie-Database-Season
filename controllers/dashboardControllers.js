const Customer = require("../models/Customer");
const Session = require("../models/Session");
const Subscription = require("../models/Subscription");
const {removeAllExpiredSession} = require("../requests/sessionRequests");
const {parseDateMoment,
    getParseDateMomentYear,
    getDaysDiffVerbose} = require("../utils/utils");

const getCustomerDashboardData = async (req, res) => {
    try {
        await removeAllExpiredSession();
        let totalCustomer = await Customer.find();
        let validCustomer = totalCustomer.filter(customer => {
            return customer.validated
        }).length;
        let sessions = await Session.find();
        let subscriptions = await Subscription.find();
        let activeCustomer = [];
        let subscribedCustomer = [];
        sessions.forEach(session => {
            if (!activeCustomer.includes(session.customerID)) {
                activeCustomer.push(session.customerID);
            }
        });
        subscriptions.forEach(subscription => {
            console.log(getDaysDiffVerbose(subscription.ended_date))
            console.log(parseDateMoment(subscription.ended_date))
            if (!subscribedCustomer.includes(subscription.customerID) && getDaysDiffVerbose(subscription.ended_date) > 0) {
                subscribedCustomer.push(subscription.customerID);
            }
        })

        console.log(subscribedCustomer);
 
        res.json({
            success: true,
            data: {
                totalCustomer: totalCustomer.length,
                validCustomer,
                activeCustomer: activeCustomer.length,
                subscribedCustomer: subscribedCustomer.length
            },
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

const getRevenueData = async (req, res) => {
    try {
        const monthList = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]
       let monthlyRevenueChartData = {};
       let revenueYearList = [];

        const subscriptions = await Subscription
        .find()
        .sort([['created_date', 'ascending']])
        .populate('planID')
        .exec();
        const firstSubscription = subscriptions[0];
        const lastSubscription = subscriptions[subscriptions.length - 1];
        const firstSubscriptionYear = getParseDateMomentYear(firstSubscription.created_date);
        const lastSubscriptionYear = getParseDateMomentYear(lastSubscription.created_date);

        for (let i = firstSubscriptionYear; i <= lastSubscriptionYear; i++) {
            revenueYearList.push(i + "");             
        }

        for (let j = 0; j < revenueYearList.length; j++) {
            const revenueYearItem = revenueYearList[j];
            let yearRevenue = {};
            let yearLabel = `year${revenueYearItem}`;
            const subscriptionsInYear = subscriptions.filter(subscription => {
                if (getParseDateMomentYear(subscription.created_date) === revenueYearItem) {
                    return true;
                }
                return false;
            })

            for (let i = 0; i < monthList.length; i++) {
                const monthItem = monthList[i];
                let totalRevenue = 0;
                const subscriptionsInMonth = subscriptionsInYear.filter(subscription => {
                    if (parseDateMoment(subscription.created_date).includes(monthItem)) {
                        
                        return true;
                    }
                    return false;
                });
                subscriptionsInMonth.forEach(subscription => {
                    totalRevenue += subscription.planID.price;
                })
                yearRevenue = {
                    ...yearRevenue,
                    [monthItem]: {totalRevenue}
                }
            }

            monthlyRevenueChartData = {
                ...monthlyRevenueChartData,
                [yearLabel]: yearRevenue
            }
        }
 
        res.json({
            success: true,
            data: {
                monthlyRevenueChartData,
                revenueYearList
            },
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

const getNewCustomerData = async (req, res) => {
    try {
        const monthList = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]
       let monthlyNewUserChartData = {};
       let newUserYearList = [];

        const customers = await Customer
        .find()
        .sort([['created_date', 'ascending']])
        .exec();
        const firstCustomer = customers[0];
        const lastCustomer = customers[customers.length - 1];
        const firstCustomerYear = getParseDateMomentYear(firstCustomer.created_date);
        const lastCustomerYear = getParseDateMomentYear(lastCustomer.created_date);

        for (let i = firstCustomerYear; i <= lastCustomerYear; i++) {
            newUserYearList.push(i + "");             
        }

        for (let j = 0; j < newUserYearList.length; j++) {
            const customerYearItem = newUserYearList[j];
            let yearCustomer = {};
            let yearLabel = `year${customerYearItem}`;
            const customersInYear = customers.filter(customer => {
                if (getParseDateMomentYear(customer.created_date) === customerYearItem) {
                    return true;
                }
                return false;
            })

            for (let i = 0; i < monthList.length; i++) {
                const monthItem = monthList[i];
                let totalCustomer = 0;
                const customersInMonth = customersInYear.filter(customer => {
                    if (parseDateMoment(customer.created_date).includes(monthItem)) {
                        return true;
                    }
                    return false;
                });
                customersInMonth.forEach(customer => {
                    totalCustomer += 1;
                })
                yearCustomer = {
                    ...yearCustomer,
                    [monthItem]: {totalCustomer}
                }
            }

            monthlyNewUserChartData = {
                ...monthlyNewUserChartData,
                [yearLabel]: yearCustomer
            }
        }
 
        res.json({
            success: true,
            data: {
                monthlyNewUserChartData,
                newUserYearList
            },
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
    getCustomerDashboardData,
    getRevenueData,
    getNewCustomerData
}