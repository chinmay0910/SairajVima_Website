const mongoose = require("mongoose");


const dataSchema = new mongoose.Schema({
    "planName": String,
    "planType": String,
    "ageStart": Number,
    "ageEnd": Number,
    "lacFIVE": String,
    "lacTEN": String,
    "lacFIFTEEN": String,
    "lacTWENTYFIVE": String,
    "lacFIFTY": String,
    "lacHUNDRED": String,
    "roomRent": String,
    "maternity": String,
    "checkUp": String,
    "noClaimBonus": String,
    "coveRestoration": String,
    "cashBenefit": String,
    "moreInfo": String,
    "copay": String
})

// Collection
const sampleData = new mongoose.model("sampleData",dataSchema);

module.exports = sampleData;