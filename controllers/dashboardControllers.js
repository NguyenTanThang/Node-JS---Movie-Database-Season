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
        /*
        monthlyRevenueChartData: {
        year2020: {
            Jan: {
                totalRevenue: 2300
            },
            Feb: {
                totalRevenue: 1900
            },
            Mar: {
                totalRevenue: 2200
            },
            Apr: {
                totalRevenue: 3000
            },
            May: {
                totalRevenue: 2700
            },
            Jun: {
                totalRevenue: 2500
            },
            Jul: {
                totalRevenue: 2200
            },
            Aug: {
                totalRevenue: 1700
            },
            Sep: {
                totalRevenue: 1500
            },
            Oct: {
                totalRevenue: 1800
            },
            Nov: {
                totalRevenue: 2100
            },
            Dec: {
                totalRevenue: 2600
            },
        },
        year2021: {
            Jan: {
                totalRevenue: 1900
            },
            Feb: {
                totalRevenue: 2700
            },
            Mar: {
                totalRevenue: 3800
            },
            Apr: {
                totalRevenue: 8200
            },
            May: {
                totalRevenue: 1700
            },
            Jun: {
                totalRevenue: 2200
            },
            Jul: {
                totalRevenue: 2500
            },
            Aug: {
                totalRevenue: 2700
            },
            Sep: {
                totalRevenue: 2100
            },
            Oct: {
                totalRevenue: 2600
            },
            Nov: {
                totalRevenue: 1500
            },
            Dec: {
                totalRevenue: 1800
            },
        }
    },
    revenueYearList: [
        "2020",
        "2021"
    ],
        */
       
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

module.exports = {
    getCustomerDashboardData,
    getRevenueData
}