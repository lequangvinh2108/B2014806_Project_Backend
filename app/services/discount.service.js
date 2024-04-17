const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class DiscountService {
    constructor(client) {
        this.Discount = client.db().collection("discount");
        this.client = client;
    }

    async createDiscount(code, product, discount, startDay, finishedDay) {
        try {
            const discountInfo = {
                code: code,
                product: product,
                discount: discount,
                startDay: startDay,
                finishedDay: finishedDay,
            };

            const result = await this.Discount.insertOne(discountInfo);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in createProduct:", error.message);
            throw error;
        }
    }

    async getAll() {
        try {
            const discount = await this.Discount.find({}).toArray();
            return discount;
        } catch (error) {
            console.error("Error in getAll:", error.message);
            throw error;
        }
    }

    async getDiscountByCode(code) {
        const filter = { code };
        const discount = await this.Discount.findOne(filter);
        return discount;
    }

    async deleteDiscount(code) {
        try {
            const filter = { code };
            const result = await this.Discount.deleteOne(filter);
            return result.deletedCount;
        } catch (error) {
            console.error("Error in deleteDiscount:", error.message);
            throw error;
        }
    }

}

module.exports = DiscountService;