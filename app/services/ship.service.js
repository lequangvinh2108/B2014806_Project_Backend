const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class ShipService {
    constructor(client) {
        this.Ship = client.db().collection("ship");
        this.client = client;
    }

    async createShippingInfo(orderId, userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods) {
        try {
            if (!ObjectId.isValid(userId)) {
                throw new Error("Invalid userId");
            }

            const shippingInfo = {
                orderId: orderId,
                userId: new ObjectId(userId),
                cart: cart,
                address: address,
                name: name,
                phone: phone,
                totalMoney: totalMoney,
                deliveryInstructions: deliveryInstructions,
                deliveryMethods: deliveryMethods,
                paymentMethods: paymentMethods,
            };

            const result = await this.Ship.insertOne(shippingInfo);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in createShippingInfo:", error.message);
            throw error;
        }
    }

    async getShip(orderId) {
        try {
            const filter = { _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null };
            const shipInfo = await this.Ship.findOne(filter);
            return shipInfo;
        } catch (error) {
            console.error("Error in getShip:", error.message);
            throw error;
        }
    }

    async saveOrderToShip(order) {
        try {
            const result = await this.Ship.insertOne(order);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in saveOrderToShip:", error.message);
            throw error;
        }
    }

    async getUserShip(userId) {
        try {
            if (!ObjectId.isValid(userId)) {
                throw new Error("Invalid userId");
            }

            const filter = { userId: new ObjectId(userId) };
            const shipInfo = await this.Ship.find(filter).toArray();
            return shipInfo;
        } catch (error) {
            console.error("Error in getUserShip:", error.message);
            throw error;
        }
    }

    async getOrderByOrderId(orderId) {
        try {
            const filter = { orderId: orderId };
            const orderInfo = await this.Ship.findOne(filter);
            return orderInfo;
        } catch (error) {
            console.error("Error in getOrderByOrderId:", error.message);
            throw error;
        }
    }

    async getOrdersByUserId(userId) {
        try {
            return (await this.api.get(`/getOrdersByUserId/${userId}`)).data;
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
            throw error;
        }
    }

    async getAllOrdersForShipper(userId) {
        try {
            if (!userId) {
                throw new Error("Invalid userId");
            }

            const filter = { userId };
            const shipperOrders = await this.Ship.find(filter).toArray();
            return shipperOrders;
        } catch (error) {
            console.error("Error in getAllOrdersForShipper:", error.message);
            throw error;
        }
    }


}

module.exports = ShipService;