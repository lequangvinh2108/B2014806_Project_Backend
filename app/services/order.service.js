const { ObjectId } = require("mongodb");
const _ = require('lodash');

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("order");
        this.client = client;
    }

    async createOrder(userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods, orderStatus) {
        try {
            if (!ObjectId.isValid(userId)) {
                throw new Error("Invalid userId");
            }

            const order = {
                userId: new ObjectId(userId),
                cart: _.cloneDeep(cart),
                orderDate: new Date(),
                address: address,
                name: name,
                phone: phone,
                totalMoney: totalMoney,
                deliveryInstructions: deliveryInstructions,
                deliveryMethods: deliveryMethods,
                paymentMethods: paymentMethods,
                orderStatus: orderStatus,
            };

            const result = await this.Order.insertOne(order);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in createOrder:", error.message);
            throw error;
        }
    }

    async getorderId(orderId) {
        const filter = {
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
        };
        const order = await this.Order.findOne(filter);
        return order;
    }


    async getOrder(userId, orderId) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
        };

        const order = await this.Order.findOne(filter);
        return order;
    }

    async getUserOrders(userId) {
        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };
        const orders = await this.Order.find(filter).toArray();
        return orders;
    }

    async getAllOrders() {
        const orders = await this.Order.find({}).toArray();
        return orders;
    }

    async deleteOrder(userId, orderId) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
        };

        const result = await this.Order.findOneAndDelete(filter);
        return result.value;
    }

    async deleteOrderById(orderId) {
        const filter = {
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
        };

        const result = await this.Order.findOneAndDelete(filter);
        return result.value;
    }

    async createShippingInfo(userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods) {
        const data = { userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods };
        return (await this.api.post("/createShippingInfo", data)).data;
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const filter = {
                _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
            };
            const update = {
                $set: {
                    orderStatus: newStatus
                }
            };
            const result = await this.Order.findOneAndUpdate(filter, update, { returnDocument: 'after' });
            return result.value;
        } catch (error) {
            console.error("Error in updateOrderStatus:", error.message);
            throw error;
        }
    }

    async updateDeliveryStatus(orderId, newStatus) {
        try {
            const filter = {
                _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
            };
            const update = {
                $set: {
                    orderStatus: newStatus
                }
            };
            const result = await this.Order.findOneAndUpdate(filter, update, { returnDocument: 'after' });
            return result.value;
        } catch (error) {
            console.error("Error in updateDeliveryStatus:", error.message);
            throw error;
        }
    }

    async getOrderByDeliveryStatus(deliveryStatus) {
        const filter = { orderStatus: deliveryStatus };
        const orders = await this.Order.find(filter).toArray();
        return orders;
    }




}

module.exports = OrderService;