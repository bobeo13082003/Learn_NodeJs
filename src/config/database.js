require('dotenv').config()

// connected mongoose
const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connect success')

    } catch (error) {
        console.log('Connect error')
    }


}
