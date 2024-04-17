const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class ListProductService {
    constructor(client) {
        this.ListProduct = client.db().collection("listproduct");
        this.client = client;
    }

    async createProduct(code, name, price, quantity, mass, imgUrl, description, expiry, importday, placeproduction) {
        try {
            const productInfo = {
                code: code,
                name: name,
                price: price,
                quantity: quantity,
                mass: mass,
                imgUrl: imgUrl,
                description: description,
                expiry: expiry,
                importday: importday,
                placeproduction: placeproduction,
            };

            const result = await this.ListProduct.insertOne(productInfo);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in createProduct:", error.message);
            throw error;
        }
    }

    async getProduct(productId) {
        try {
            const filter = { _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null };
            const productInfo = await this.ListProduct.findOne(filter);
            return productInfo;
        } catch (error) {
            console.error("Error in getProduct:", error.message);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const filter = { _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null };
            const result = await this.ListProduct.deleteOne(filter);
            return result.deletedCount;
        } catch (error) {
            console.error("Error in deleteProduct:", error.message);
            throw error;
        }
    }

    async deleteAllProducts() {
        try {
            const result = await this.ListProduct.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            console.error("Error in deleteAllProducts:", error.message);
            throw error;
        }
    }

    async getAll() {
        try {
            const productList = await this.ListProduct.find({}).toArray();
            return productList;
        } catch (error) {
            console.error("Error in getAll:", error.message);
            throw error;
        }
    }


    async updateProduct(code, productData) {
        try {
            const filter = { code: code };
            const result = await this.ListProduct.findOneAndUpdate(filter, { $set: productData }, { returnDocument: "after" });
            return result.value;
        } catch (error) {
            console.error("Error in updateProduct:", error.message);
            throw error;
        }
    }

    async updateId(productId, productData) {
        try {
            const filter = { _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null };
            const result = await this.ListProduct.findOneAndUpdate(filter, { $set: productData }, { returnDocument: "after" });
            return result.value;
        } catch (error) {
            console.error("Error in updateId:", error.message);
            throw error;
        }
    }


}

module.exports = ListProductService;