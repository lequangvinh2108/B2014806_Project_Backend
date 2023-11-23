const ApiError = require("../api-error");
const UserService = require("../services/user");
const MongoDB = require("../utils/mongodb.util");

exports.register = async(req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.create(req.body);
        return res.send({ user });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while registering the user"));
    }
};

exports.login = async(req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.authenticate(req.body.email, req.body.password);

        if (!user) {
            return next(new ApiError(401, "Invalid email or password"));
        }

        return res.send({ user });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while logging in"));
    }
};

exports.getUserProfile = async(req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(req.params.id);

        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        return res.send({ user });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving user profile"));
    }
};

exports.getAllUsers = async(req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const users = await userService.findAll();
        return res.send({ users });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving all users"));
    }
};

exports.updateUser = async(req, res, next) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        const userService = new UserService(MongoDB.client);
        const updatedUser = await userService.update(userId, updatedUserData);

        if (!updatedUser) {
            return next(new ApiError(404, "User not found"));
        }

        return res.send({ user: updatedUser });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error updating user with id = ${userId}`));
    }
};

exports.deleteUser = async(req, res, next) => {
    const userId = req.params.id;

    try {
        const userService = new UserService(MongoDB.client);
        const deletedUser = await userService.delete(userId);

        if (!deletedUser) {
            return next(new ApiError(404, "User not found"));
        }

        return res.send({ message: "User was deleted successfully", deletedUser });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Could not delete user with id = ${userId}`));
    }
};

exports.logout = async(req, res, next) => {
    try {
        const user = req.user;
        const token = req.headers.authorization;

        const userService = new UserService(MongoDB.client);
        await userService.logout(user.userId, token);

        return res.send({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while logging out"));
    }
};