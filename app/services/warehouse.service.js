const { ObjectId } = require("mongodb");

class WarehouseService {
    constructor(client) {
        this.Warehouse = client.db().collection("warehouse");
        this.client = client;
    }

    async addProductsToWarehouse(invoice) {
        const { number, date, supplier, items } = invoice;

        // Kiểm tra các thông tin hợp lệ
        if (!number || !date || !supplier || !Array.isArray(items) || items.length === 0) {
            throw new Error("Invalid invoice information");
        }

        // Duyệt qua từng sản phẩm trong danh sách items và thêm vào kho
        const result = await Promise.all(items.map(async(item) => {
            const { productId, product, quantity, unitPrice, mass, expiry } = item;

            const filter = { productId };
            const existingProduct = await this.Warehouse.findOne(filter);

            if (!existingProduct) {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào kho
                const newProduct = {
                    productId,
                    product,
                    items: [{ number, date, supplier, quantity, mass, unitPrice, expiry }],
                    totalQuantity: quantity // Thêm trường totalQuantity và gán giá trị ban đầu là quantity
                };

                return this.Warehouse.insertOne(newProduct);
            } else {
                // Nếu sản phẩm đã tồn tại
                existingProduct.items = existingProduct.items || [];
                existingProduct.items.push({ number, date, supplier, quantity, mass, unitPrice, expiry });

                // Cập nhật số lượng
                existingProduct.totalQuantity += quantity; // Cập nhật totalQuantity bằng cách cộng thêm quantity mới

                const update = {
                    $set: {
                        totalQuantity: existingProduct.totalQuantity,
                        items: existingProduct.items
                    },
                };

                return this.Warehouse.findOneAndUpdate(filter, update, { returnDocument: "after" });
            }
        }));

        return result.map(res => res.ops ? res.ops[0] : res.value);
    }



    async getWarehouse(number) {
        const filter = { number };
        const warehouseItem = await this.Warehouse.findOne(filter);
        return warehouseItem;
    }

    async getProductInWarehouse(productId) {
        const filter = { productId };
        const warehouseProduct = await this.Warehouse.findOne(filter);
        return warehouseProduct;
    }

    async getWarehouseItems() {
        const warehouseItems = await this.Warehouse.find().toArray();
        return warehouseItems;
    }

    async getAll() {
        const allWarehouseItems = await this.Warehouse.find().toArray();
        return allWarehouseItems;
    }


}

module.exports = WarehouseService;