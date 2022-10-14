const db = require("./db");

const postMethod = (fullName, email, phone, userType, activeStatus) => {
    return db.UserDetails.findOne({ fullName }).then((detail) => {
    if (detail) {
      return {
        statusCode: 422,
        status: false,
        message: "User details Already Exist, Use Different One",
      };
    } else {
      const newDetails = new db.UserDetails({
        fullName,
        email,
        phone,
        userType,
        activeStatus,
      });
      newDetails.save();
      return {
        statusCode: 200,
        status: true,
        message: "User Details Added using POST Method.",
        data: {
          fullName,
          email,
          phone,
          userType,
          activeStatus,
        },
      };
    }
  });
};

const getMethod = (fullName) => {
  return db.UserDetails.findOne({ fullName }).then((detail) => {
    if (detail) {
      return {
        statusCode: 200,
        message: "User details found",
        details: detail,
      };
    } else {
      return {
        statusCode: 422,
        message: "User Details not found..",
      };
    }
  });
};

const updateMethod = (email, emailNew) => {
    return db.UserDetails.updateOne({ email }, { $set: { email: emailNew } }).then((detail) => {
    if (detail?.modifiedCount) {
      return {
        statusCode: 200,
        message: "Details Updated Successfully",
      };
    } else {
      return {
        statusCode: 422,
        message: "User Details not found..",
      };
    }
  });
};

const deleteMethod = (fullName, email) => {
  return db.UserDetails.deleteOne({ fullName, email }).then((detail) => {
    if (detail?.deletedCount) {
      return {
        statusCode: 200,
        message: "Details Successfully Deleted",
      };
    } else {
      return {
        statusCode: 422,
        message: "User Details not found..",
      };
    }
  });
};

module.exports = { postMethod, getMethod, updateMethod, deleteMethod };
