const axios = require('axios');
var fetch = require('node-fetch');
const btoa = function(str){ return Buffer.from(str).toString('base64'); }
var request = require('request');

const checkPaymentStatus = async (accessToken, orderID) => {
    const res = await axios.get(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    // status
    return res.data;
}

const getPaypalAuthorizationToken = async (callback) => {
    /*
    const res = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Authorization': 'Basic ' + btoa('ARY7az4KO34sNaA9MkbfeUAPP9TFUE6z_Ahyb82mbLDuxyu8x0sA8TNZ4ImLkU0Ee0ahRuZfP2w84UAI:EA8y3A7gaDf_YFxqEBV3_MwPdwE_NvJ7Bp7Y31HGcyASvelHTBR7yQqPfoPpvA3l-bRlJbDpZO1W1LjA')
        },
        body: 'grant_type=client_credentials'
    });
    return res;
    */

    var headers = {
        'Accept': 'application/json',
        'Accept-Language': 'en_US'
    };

    var dataString = 'grant_type=client_credentials';

    var options = {
        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        method: 'POST',
        headers: headers,
        body: dataString,
        auth: {
            'user': 'ARY7az4KO34sNaA9MkbfeUAPP9TFUE6z_Ahyb82mbLDuxyu8x0sA8TNZ4ImLkU0Ee0ahRuZfP2w84UAI',
            'pass': 'EA8y3A7gaDf_YFxqEBV3_MwPdwE_NvJ7Bp7Y31HGcyASvelHTBR7yQqPfoPpvA3l-bRlJbDpZO1W1LjA'
        }
    };

    //access_token
    return request(options, callback);
}

module.exports = {
    getPaypalAuthorizationToken,
    checkPaymentStatus
}
