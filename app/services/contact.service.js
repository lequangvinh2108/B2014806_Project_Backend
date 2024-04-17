const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contact");
        this.client = client;
    }

    async createContact(fullname, email, content) {
        try {
            const contactInfo = {
                fullname: fullname,
                email: email,
                content: content,
            };

            const result = await this.Contact.insertOne(contactInfo);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in createProduct:", error.message);
            throw error;
        }
    }

    async getAll() {
        try {
            const contact = await this.Contact.find({}).toArray();
            return contact;
        } catch (error) {
            console.error("Error in getAll:", error.message);
            throw error;
        }
    }
}

module.exports = ContactService;