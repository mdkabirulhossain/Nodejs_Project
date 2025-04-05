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
    data.read("users", phone, (err, user) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          termAgreement,
        };

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
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone.trim()
      : false;

  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName.trim()
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName.trim()
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password.trim()
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // Read the existing user
      data.read("users", phone, (err, userData) => {
        if (!err && userData) {
          // Parse the userData (if stored as string JSON)
          const userObject = { ...userData };

          if (firstName) userObject.firstName = firstName;
          if (lastName) userObject.lastName = lastName;
          if (password) userObject.password = hash(password);

          // Update the user data
          data.update("users", phone, userObject, (err) => {
            if (!err) {
              callback(200, {
                message: "User was updated successfully!",
              });
            } else {
              callback(500, {
                error: "Server error while updating the user.",
              });
            }
          });
        } else {
          callback(404, {
            error: "User not found!",
          });
        }
      });
    } else {
      callback(400, {
        error: "You must provide at least one field to update (firstName, lastName, or password).",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number provided.",
    });
  }
};



handler._users.delete = (requestProperties, callback) => {
  callback(200, { message: "DELETE method is working!" });
};

// Export module
module.exports = handler;
