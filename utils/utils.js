const {
    CURRENT_URL
} = require("../config/config");
const {
    MILI_IN_DAY
} = require("../constants/variables");
const uuid = require("uuid");
const moment = require("moment");

const parseDateMoment = (date) => {
    return moment(date).format('MMM Do YYYY');
}

const getParseDateMomentYear = (date) => {
    return moment(date).format('YYYY');
}

const getDaysDiff = (date) => {
    const dateMili = dateToMili(date);
    const dateNowMili = dateToMili(new Date.now());
    const diffTime = Math.abs(dateNowMili - dateMili);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; 
}

const getDaysDiffVerbose = (date) => {
    const dateMili = dateToMili(date);
    const dateNowMili = dateToMili(Date.now());
    const diffTime = Math.abs(dateNowMili - dateMili);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (dateNowMili > dateMili) {
        diffDays = -diffDays;
    }
    return diffDays; 
}

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
    generateChangePasswordToken,
    getDaysDiff,
    parseDateMoment,
    getParseDateMomentYear,
    getDaysDiffVerbose
}