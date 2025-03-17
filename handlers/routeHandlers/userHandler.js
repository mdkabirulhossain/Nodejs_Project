//dependencies
const data = require('../../lib/data');
const{hash} = require('../../helpers//utilities');

//Module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
  const firsName =
    typeof requestProperties.body.firsName === "string" &&
    requestProperties.body.firsName.trim().length > 0
      ? requestProperties.body.firsName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tarmAgreement =
    typeof requestProperties.body.tarmAgreement === "boolean" &&
    requestProperties.body.tarmAgreement.trim().length > 0
      ? requestProperties.body.tarmAgreement
      : false;

    if(firsName, lastName, phone, password, tarmAgreement){
        //make sure that the user does not already exist
        data.read('users', phone, (err, user)=>{
            if(err){
                let userObject = {
                    firsName,
                    lastName,
                    phone,
                    password: hash(password),
                    tarmAgreement,
                };
                //store user to db

            }else{
                callback(500, {
                    error: 'There was a problem in server side!',
                })
            }
        })

    } else{
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};
handler._users.get = (requestProperties, callback) => {
  callback(200);
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
