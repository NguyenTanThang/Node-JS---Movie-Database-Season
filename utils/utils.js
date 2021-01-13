const {
    CURRENT_URL
} = require("../config/config");
const {
    MILI_IN_DAY
} = require("../constants/variables");
const crypto = require("crypto");
const uuid = require("uuid");

const isObjectEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const convertDaysIntoMili = days => {
    return MILI_IN_DAY * parseInt(days)
}

const dateToMili = date => {
    const cdate = new Date(date);
    return cdate.getTime();
}

const miliToDate = mili => {
    const cdate = new Date(mili);
    return cdate;
}

const generateCustomerValidationLink = (customerID) => {
    return `${CURRENT_URL}/customers/validate/${customerID}`;
}

const generateChangePasswordToken = () => {
    return uuid.v4();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const exchangeURLToFileDirectory = (url) => {
    var uri = url;
    var enc = encodeURI(uri);
    var dec = decodeURI(enc);
    var tempUrl = dec.replace(/%20/g, " ");
    tempUrl = tempUrl.replace(/%2F/g, "/");
    tempUrl = tempUrl.split("?")[0].split("/o/")[1];
    return tempUrl;
}

module.exports = {
    isObjectEmpty,
    generateCustomerValidationLink,
    convertDaysIntoMili,
    dateToMili,
    miliToDate,
    capitalizeFirstLetter,
    exchangeURLToFileDirectory,
    generateChangePasswordToken
}