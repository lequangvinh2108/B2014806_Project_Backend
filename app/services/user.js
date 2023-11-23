const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.Users = client.db().collection("user");
    }

    extractUserData(payload) {
        const user = {
            username: payload.username,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            password: payload.password,
        };
        Object.keys(user).forEach((key) => user[key] === undefined && delete user[key]);
        return user;
    }

    async create(payload) {
        const userData = this.extractUserData(payload);
        const result = await this.Users.insertOne(userData);
        return result.ops[0];
    }

    async find(filter) {
        const cursor = await this.Users.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Users.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findAll() {
        return await this.find({});
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
            $set: {
                username: payload.username,
                email: payload.email,
                address: payload.address,
                phone: payload.phone,
                password: payload.password,
            },
        };

        const result = await this.Users.findOneAndUpdate(filter, update, { returnDocument: "after" });
        return result.value;
    }

    async delete(id) {
        const result = await this.Users.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }

    async authenticate(email, password) {
        const user = await this.Users.findOne({ email: email });

        if (!user || user.password !== password) {
            return null;
        }

        return user;
    }

    async logout(userId, token) {
        // Perform logout actions (if any)
    }
}

module.exports = UserService;