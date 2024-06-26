const ApiError = require("../api-error");
const ContactService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");


exports.create = async(req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }


    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async(req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents)
};

exports.findOne = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);

        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        await contactService.update(req.params.id, req.body);
        // if (!document) {
        //     return next(new ApiError(404, "Contact not found"));
        // }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);

        // Đã thay đổi chỗ này thành findById()
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        await contactService.delete(req.params.id);
        // if (!document) {
        //     return next(new ApiError(404, "Contact not found"));
        // }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete contact with id = ${req.params.id}`)
        );
    }
};

exports.deleteAll = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({ message: `${deleteCount} contact was deleted successfully` });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

exports.findAllFavorite = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};

exports.updateCode = async(req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);

        const document = await contactService.findByCode(req.params.code);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        await contactService.updateCode(req.params.code, req.body);
        return res.send({ message: "Product was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with code = ${req.params.code}`)
        );
    }
};

exports.findByCode = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findByCode(req.params.code);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving product with code = ${req.params.code}`)
        );
    }
};

exports.updateDiscount = async(req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);

        const document = await productService.findByCode(req.params.code);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        await productService.updateDiscount(req.params.code, req.body);
        return res.send({ message: "Product discount was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating discount for product with code = ${req.params.code}`)
        );
    }
};