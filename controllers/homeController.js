const Email = require('../models/email');

const homeController = (req, res) =>{
    res.render('index.ejs')
}

const comingsoon = (req, res) =>{
    res.render('commingsoon.ejs')
}

const products = (req, res) =>{
    res.render('licproducts.ejs')
}

// POST route to handle form submission
const SubmitEmails = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if email already exists in the database
        const existingUser = await Email.findOne({ email });

        if (existingUser) {
            // Email already exists in the database
            return res.status(200).json({ message: 'Email ID already exists', isNewEntry: false });
        }

        // Create a new user record if email doesn't exist
        const newUser = new Email({ email });
        await newUser.save();

        // Send success response
        return res.status(201).json({ message: 'Thankyou for your subscribtion', isNewEntry: true });
    } catch (error) {
        console.error('Error submitting email:', error);
        return res.status(500).json({ message: 'Something Unexpected occured.. Try Again !!' });
    }
}

module.exports = { homeController, comingsoon, products, SubmitEmails } 