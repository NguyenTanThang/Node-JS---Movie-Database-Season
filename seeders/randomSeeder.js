const stripe = require('stripe')('sk_test_ETJsviO2O5GerqT9HQ5Tsw9a00f0qbPheK');

const seed = async () => {
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 10,
          exp_year: 2030,
          cvc: '314',
        },
      });
}

seed();
