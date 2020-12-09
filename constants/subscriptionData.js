const usdToVnd = (usd) => {
    const usdRate = 23000;
    return Math.ceil(usd *  usdRate);
}

const STRIPE_SUBSCRIPTIONS = {
    weekly: {amount: 4.99, priceID: "price_1HgmfLHmOKCWr3PmsC6iq68H"},
    monthly: {amount: 19.99, priceID: "price_1HgmfvHmOKCWr3PmxourE9Nw"},
    yearly: {amount: 199.99, priceID: "price_1HgmgSHmOKCWr3Pmj9oeadzM"},
}

const MOMO_SUBSCRIPTIONS = {
    weekly: {amount: usdToVnd(STRIPE_SUBSCRIPTIONS.weekly.amount), priceID: "price_1HgmfLHmOKCWr3PmsC6iq68H"},
    monthly: {amount: usdToVnd(STRIPE_SUBSCRIPTIONS.monthly.amount), priceID: "price_1HgmfvHmOKCWr3PmxourE9Nw"},
    yearly: {amount: usdToVnd(STRIPE_SUBSCRIPTIONS.yearly.amount), priceID: "price_1HgmgSHmOKCWr3Pmj9oeadzM"},
}

console.log(MOMO_SUBSCRIPTIONS);

const getMomoSubByAmount = (amount) => {
    let ans = {};
    for (var key in MOMO_SUBSCRIPTIONS) {
        if (MOMO_SUBSCRIPTIONS.hasOwnProperty(key)) {
            if (MOMO_SUBSCRIPTIONS[key].amount == amount) {
                ans = MOMO_SUBSCRIPTIONS[key];
                break;
            }
        }
    }
    return ans;
}

module.exports = {
    getMomoSubByAmount,
    usdToVnd
}