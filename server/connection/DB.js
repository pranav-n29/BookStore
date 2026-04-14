const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionwithDB = () => {
  mongoose.connect(process.env.mongoDBURL)
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log(err));
};

module.exports = connectionwithDB;