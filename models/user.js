const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    family_Size: {
        type: String,
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    sumAssured: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobileNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    data: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
