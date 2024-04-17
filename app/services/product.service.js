const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Products = client.db().collection("products");
    }

    extractProductData(payload) {
        const product = {
            code: payload.code,
            name: payload.name,
            price: payload.price,
            importprice: payload.importprice,
            mass: payload.mass,
            quantity: payload.quantity, //
            description: payload.description,
            imgUrl: payload.imgUrl,
            // importday: payload.importday, 
            // expiry: payload.expiry, 
            // placeproduction: payload.placeproduction, 
            // favorite: payload.favorite,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        const result = await this.Products.findOneAndUpdate(
            product, { $set: { favorite: product.favorite === true } }, { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Products.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Products.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Products.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        );
        return result.value;
    }

    async updateCode(code, payload) {
        const filter = { code: code };
        const update = this.extractProductData(payload);
        const result = await this.Products.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        );
        return result.value;
    }


    async delete(id) {
        const result = await this.Products.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Products.deleteMany({});
        return result.deletedCount;
    }

    async findByCode(code) {
        return await this.Products.findOne({
            code: code,
        });
    }

    async updateDiscount(code, payload) {
        const filter = { code: code };
        const update = {
            $set: {
                discount: payload.discount,
                startDay: payload.startDay,
                finishedDay: payload.finishedDay
            }
        };
        const result = await this.Products.findOneAndUpdate(
            filter, update, { returnDocument: "after" }
        );
        return result.value;
    }


}

module.exports = ProductService;