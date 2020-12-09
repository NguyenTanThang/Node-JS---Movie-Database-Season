import axios from "axios";

const CURRENCY_API = `http://data.fixer.io/api/latest?access_key=8979eef7f696eda5b948f4a96a2dbdaa&format=1`;

export const VNDtoEuro = async (vnd) => {
    try {
        const res = await axios.get(CURRENCY_API);
        const data = res.data;

        if (!data.success) {
            console.log(data);
        } 

        const vndRate = data.rates.VND;
        let euro = vnd / vndRate;
        euro = euro.toFixed(0);
        
        return parseInt(euro);
    } catch (error) {
        console.log(error);
    }
}

export const USDtoEuro = async (usd) => {
    try {
        const res = await axios.get(CURRENCY_API);
        const data = res.data;

        if (!data.success) {
            console.log(data);
        } 

        const usdRate = data.rates.USD;
        
        return usd / usdRate;
    } catch (error) {
        console.log(error);
    }
}

export const EurotoVND = async (euro) => {
    try {
        const res = await axios.get(CURRENCY_API);
        const data = res.data;

        if (!data.success) {
            console.log(data);
        } 

        const vndRate = data.rates.VND;
        let vnd = euro * vndRate;
        vnd = vnd.toFixed(0);
        
        return parseInt(vnd);
    } catch (error) {
        console.log(error);
    }
}

export const USDtoVND = async (usd) => {
    try {
        const euro = await USDtoEuro(usd);
        const vnd = await EurotoVND(euro);

        return vnd;
    } catch (error) {
        console.log(error);
        message.error(error.message);
    }
}