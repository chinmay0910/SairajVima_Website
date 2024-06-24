const path = require('path');
const sampleData = require("../models/sampledata");
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const User = require('../models/user'); // Import the User model

// GET : /quote
const quoteController = (req, res) => {
    res.render('quote.ejs', { data: null, errors: [] });
};

// POST : /quote
let DATA, dob, family_Size, NAME, PLANNAME, SUMASSURED, Age, MobileNo;
const getpremiumController = async (req, res) => {
    let errors = [];

    try {
        dob = req.body.date;
        if (new Date(dob) > new Date()) {
            errors.push("Date of Birth cannot be in the future.");
        }

        if (!req.body.name) {
            errors.push("Name is required.");
        }

        if (!req.body.family_Size) {
            errors.push("Family size is required.");
        }

        if (!req.body.Ins_product) {
            errors.push("Product is required.");
        }

        if (!req.body.sumassured) {
            errors.push("Sum assured is required.");
        }

        if (!req.body.mobileNo || !/^\d{10}$/.test(req.body.mobileNo)) {
            errors.push("Valid mobile number is required.");
        }

        if (errors.length > 0) {
            return res.render('quote.ejs', { data: null, errors });
        }

        var year = Number(dob.substr(0, 4));
        var month = Number(dob.substr(5, 2)) - 1;
        var day = Number(dob.substr(8, 2));

        let today = new Date();
        Age = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            Age--;
        }

        family_Size = req.body.family_Size;
        PLANNAME = req.body.Ins_product;
        NAME = req.body.name;
        SUMASSURED = req.body.sumassured;
        MobileNo = req.body.mobileNo;

        DATA = await sampleData.find({ "planType": family_Size, 'ageStart': { $lte: Age }, 'ageEnd': { $gte: Age } });

        // Save the user request data to the database
        const user = new User({
            name: NAME,
            dob: new Date(dob),
            family_Size: family_Size,
            planName: PLANNAME,
            sumAssured: SUMASSURED,
            age: Age,
            mobileNo: MobileNo,
            data: DATA
        });

        await user.save();

        res.status(200).render('quote.ejs', { data: DATA, errors: [] });
    } catch (error) {
        errors.push(error.message);
        res.status(404).render('quote.ejs', { data: null, errors });
    }
};

const downloadPresentation = async (req, res) => {
    try {
        let filepath = path.join('public/', 'newForm1.pdf');

        const pdfBytes = fs.readFileSync(filepath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        // Getting Fields
        const nameField = form.getTextField('name');
        const familySize = form.getTextField('familySize');
        const plannameField = form.getTextField('planname');
        const sumassured = form.getTextField('sumassured');
        const premium = form.getTextField('premium');
        const premiumPlanName0 = form.getTextField('premiumPlanName0');
        const premiumPlan0Name5 = form.getTextField('premiumPlan0Name5lac');
        const premiumPlan0Name10 = form.getTextField('premiumPlan0Name10lac');
        const premiumPlan0Name15 = form.getTextField('premiumPlan0Name15lac');
        const premiumPlan0Name25 = form.getTextField('premiumPlan0Name25lac');
        const premiumPlan0Name50 = form.getTextField('premiumPlan0Name50lac');
        const premiumPlan0Name100 = form.getTextField('premiumPlan0Name100lac');
        const premiumPlanName1 = form.getTextField('premiumPlanName1');
        const premiumPlan1Name5 = form.getTextField('premiumPlan1Name5lac');
        const premiumPlan1Name10 = form.getTextField('premiumPlan1Name10lac');
        const premiumPlan1Name15 = form.getTextField('premiumPlan1Name15lac');
        const premiumPlan1Name25 = form.getTextField('premiumPlan1Name25lac');
        const premiumPlan1Name50 = form.getTextField('premiumPlan1Name50lac');
        const premiumPlan1Name100 = form.getTextField('premiumPlan1Name100lac');
        const premiumPlanName2 = form.getTextField('premiumPlanName2');
        const premiumPlan2Name5 = form.getTextField('premiumPlan2Name5lac');
        const premiumPlan2Name10 = form.getTextField('premiumPlan2Name10lac');
        const premiumPlan2Name15 = form.getTextField('premiumPlan2Name15lac');
        const premiumPlan2Name25 = form.getTextField('premiumPlan2Name25lac');
        const premiumPlan2Name50 = form.getTextField('premiumPlan2Name50lac');
        const premiumPlan2Name100 = form.getTextField('premiumPlan2Name100lac');

        let planBuffer = await sampleData.findOne({ "planName": PLANNAME, "planType": family_Size, 'ageStart': { $lte: Age }, 'ageEnd': { $gte: Age } });

        if (SUMASSURED == '5 Lakh') {
            premium.setText(planBuffer.lacFIVE);
        } else if (SUMASSURED == '10 Lakh') {
            premium.setText(planBuffer.lacTEN);
        } else if (SUMASSURED == '15 Lakh') {
            premium.setText(planBuffer.lacFIFTEEN);
        } else if (SUMASSURED == '25 Lakh') {
            premium.setText(planBuffer.lacTWENTYFIVE);
        } else if (SUMASSURED == '50 Lakh') {
            premium.setText(planBuffer.lacFIFTY);
        } else {
            premium.setText(planBuffer.lacHUNDRED);
        }

        nameField.setText(NAME);
        plannameField.setText(PLANNAME);
        sumassured.setText(SUMASSURED);
        familySize.setText(family_Size);

        // COMPARISON VALUES SET
        premiumPlanName0.setText(DATA[0].planName);
        premiumPlan0Name5.setText(DATA[0].lacFIVE);
        premiumPlan0Name10.setText(DATA[0].lacTEN);
        premiumPlan0Name15.setText(DATA[0].lacFIFTEEN);
        premiumPlan0Name25.setText(DATA[0].lacTWENTYFIVE);
        premiumPlan0Name50.setText(DATA[0].lacFIFTY);
        premiumPlan0Name100.setText(DATA[0].lacHUNDRED);
        premiumPlanName1.setText(DATA[1].planName);
        premiumPlan1Name5.setText(DATA[1].lacFIVE);
        premiumPlan1Name10.setText(DATA[1].lacTEN);
        premiumPlan1Name15.setText(DATA[1].lacFIFTEEN);
        premiumPlan1Name25.setText(DATA[1].lacTWENTYFIVE);
        premiumPlan1Name50.setText(DATA[1].lacFIFTY);
        premiumPlan1Name100.setText(DATA[1].lacHUNDRED);
        premiumPlanName2.setText(DATA[2].planName);
        premiumPlan2Name5.setText(DATA[2].lacFIVE);
        premiumPlan2Name10.setText(DATA[2].lacTEN);
        premiumPlan2Name15.setText(DATA[2].lacFIFTEEN);
        premiumPlan2Name25.setText(DATA[2].lacTWENTYFIVE);
        premiumPlan2Name50.setText(DATA[2].lacFIFTY);
        premiumPlan2Name100.setText(DATA[2].lacHUNDRED);

        // paragraphs
        const roomRent = form.getTextField('roomRent');
        const maternity = form.getTextField('maternity');
        const checkUp = form.getTextField('healthCheckup');
        const NoclaimBonus = form.getTextField('NoClaimBonus');
        const coverRestoration = form.getTextField('coverRestoration');
        const cashBenifit = form.getTextField('cashAllowance');
        const coPay = form.getTextField('coPay');
        const dayCare = form.getTextField('dayCare');

        let planDetails = await sampleData.findOne({ "planType": "info", "planName": PLANNAME });

        roomRent.setText(planDetails.roomRent);
        maternity.setText(planDetails.maternity);
        checkUp.setText(planDetails.checkUp);
        NoclaimBonus.setText(planDetails.noClaimBonus);
        coverRestoration.setText(planDetails.coveRestoration);
        cashBenifit.setText(planDetails.cashBenefit);
        coPay.setText(planDetails.copay);
        dayCare.setText(planDetails.moreInfo);

        form.flatten();

        const modifiedPdfBytes = await pdfDoc.save();

        res.setHeader('Content-Disposition', `attachment; filename="${NAME}_Quotation.pdf"`);
        res.contentType("application/pdf");

        res.end(modifiedPdfBytes);
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = { quoteController, getpremiumController, downloadPresentation };
