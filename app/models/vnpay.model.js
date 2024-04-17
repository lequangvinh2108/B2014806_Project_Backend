import db from "../config/database.js";

export const getVNPayModel = (id, result) => {
    db.query("SELECT * FROM vnpay WHERE TxnRef = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const insertVNPayModel = (data, result) => {
    db.query("INSERT INTO vnpay SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};