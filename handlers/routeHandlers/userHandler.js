// Dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");


// Module scaffolding
const handler = {}; // ✅ Define handler first

// Define _users before calling it
handler._users = {};

// Main handler function
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  
  // Convert method to lowercase
  const method = requestProperties.method.toLowerCase();

  if (acceptedMethods.includes(method)) {
    if (typeof handler._users[method] === "function") {
      handler._users[method](requestProperties, callback);
    } else {
      callback(405, { error: "Method not implemented!" });
    }
  } else {
    callback(405, { error: "Method not allowed!" });
  }
};

// ✅ Define all CRUD methods

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
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

  const termAgreement =
      typeof requestProperties.body.termAgreement === "boolean"
        ? requestProperties.body.termAgreement
        : false;
    

  if (firstName && lastName && phone && password && termAgreement) {
    // Make sure user does not already exist
    data.read("users", phone, (err, user) => {
      if (err) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          termAgreement,
        };

        // Store user in DB
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, { message: "User is created successfully" });
          } else {
            callback(500, { error: "Could not create user!" });
          }
        });
      } else {
        callback(500, { error: "User already exists!" });
      }
    });
  } else {
    callback(400, { error: "Invalid input data" });
  }
};

handler._users.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone.trim()
      : false;

  if (phone) {
    // Lookup the user
    data.read("users", phone, (err, u) => {
      if (!err && u) {
        try {
          const user = JSON.parse(u); // Ensure JSON parsing works properly
          if (user && typeof user === "object") {
            delete user.password; // Remove password before sending response
            callback(200, user);
          } else {
            callback(500, { error: "User data is corrupted!" });
          }
        } catch (error) {
          callback(500, { error: "Failed to parse user data!" });
        }
      } else {
        callback(404, { error: "Requested user was not found!" });
      }
    });
  } else {
    callback(400, { error: "Invalid phone number format!" });
  }
};


handler._users.put = (requestProperties, callback) => {
  callback(200, { message: "PUT method is working!" });
};

handler._users.delete = (requestProperties, callback) => {
  callback(200, { message: "DELETE method is working!" });
};

// Export module
module.exports = handler;
