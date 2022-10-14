const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log(`MongoDB Atlas is connected to ${connect.connection.host}`);
    }
    catch (err) {
      console.log(`Error is: ${err.message}`);
      process.exit(1); // Uncaught Fatal Exception
    }
}

// mongoose.model(modelName, schema):
const UserDetails = mongoose.model('details',{
    fullName: String,
    email: String,
    phone: String,
    userType: String,
    activeStatus: Boolean,

    // fullName: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // phone: {
    //     type: String,
    //     required: true,
    // },
    // userType: {
    //     type: String,
    //     required: true,
    // },
    // activeStatus: {
    //     type: String,
    //     required: true,
    //     default: false,
    // },
})

module.exports = {connectDb, UserDetails}

