const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// Đăng ký người dùng
router.post("/register", UserController.register);

// Đăng nhập
router.post("/login", UserController.login);

// Lấy thông tin người dùng dựa trên ID (ví dụ: /api/users/123)
router.get("/:id", UserController.getUserProfile);

// Lấy danh sách tất cả người dùng
router.get("/", UserController.getAllUsers);

// Cập nhật thông tin người dùng dựa trên ID
router.put("/:id", UserController.updateUser);

// Xóa người dùng dựa trên ID
router.delete("/:id", UserController.deleteUser);

// Đăng xuất
router.post("/logout", UserController.logout);

module.exports = router;