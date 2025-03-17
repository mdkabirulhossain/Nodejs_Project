
//dependencies
const crypto = require('crypto');
const environment = require ('./environment');
//module scaffolding
const utilities = {};

//parse JSON string to Object
utilities.parseJSON = (jsonString) =>{
    let output;

    try{
        output = JSON.parse(jsonString);
    }
    catch{
        output = {};
    }
}
//hash string
utilities.hash = (str) =>{
    if(typeof str === 'string' && str.length > 0){
        const hash = crypto
        .createHmac('sha256', environment[process.env.NODE_ENV].secretKey)
        .update('If you love node so much why you do not learn always')
        .digest('hex');
        return hash;
    }else{
        return false;
    }
}

//export module
module.exports = utilities;