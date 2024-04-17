const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");


exports.createContact = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const { fullname, email, content } = req.body;
        const result = await contactService.createContact(fullname, email, content);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createContact:", error.message);
        next(new ApiError(500, 'An error occurred while creating contact'));
    }
};

exports.getAll = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const contact = await contactService.getAll();
        res.json(contact);
    } catch (error) {
        console.error("Error in getAll:", error.message);
        next(new ApiError(500, 'An error occurred while getting all contacts'));
    }
};