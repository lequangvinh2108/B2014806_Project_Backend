const express = require("express");
const cors = require("cors");
const app = express();
const ApiError = require("./app/api-error");

const productsRouter = require("./app/routes/product.route");
const usersRouter = require("./app/routes/user.route");
const cartRoutes = require("./app/routes/cart.route");
const orderRouter = require("./app/routes/order.route");
const shipRouter = require("./app/routes/ship.route");
const ListProduct = require("./app/routes/listproduct.route");
const Warehouse = require("./app/routes/warehouse.route");
const ReView = require("./app/routes/review.route");
const Contact = require("./app/routes/contact.route");
const Discount = require("./app/routes/discount.route");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Chào mừng bạn đến với ứng dụng Books Store" });
});

app.use("/api/products", productsRouter);
app.use("/api/auth", usersRouter);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRouter);
app.use("/api/ship", shipRouter);
app.use("/api/listproduct", ListProduct);
app.use("/api/warehouse", Warehouse);
app.use("/api/reviews", ReView);
app.use("/api/contacts", Contact);
app.use("/api/discounts", Discount);

// Middleware xử lý lỗi
app.use((req, res, next) => {
    // Mã này sẽ chạy khi không có route nào khớp với yêu cầu.
    // Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

// Định nghĩa middleware xử lý lỗi cuối cùng, sau các app.use() và routes khác
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi Nội bộ của Server",
    });
});

module.exports = app;