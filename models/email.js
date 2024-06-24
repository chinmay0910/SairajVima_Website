const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

// Collection
const emailSchema = new mongoose.model("Emails",EmailSchema);

module.exports = emailSchema;