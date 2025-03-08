"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = exports.MAX_FILE_SIZE = exports.storage = void 0;
var multer = require("multer");
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products');
    },
    filename: function (req, file, cb) {
        var name = file.originalname.split('.').slice(0, -1).join('.');
        var ext = file.originalname.split('.').pop();
        if (!ext) {
            return cb(new Error('Invalid file name'), '');
        }
        cb(null, "".concat(name, "-").concat(Date.now(), ".").concat(ext));
    },
});
exports.MAX_FILE_SIZE = 1 * 1024 * 1024;
exports.multerConfig = { storage: exports.storage, limits: { fileSize: exports.MAX_FILE_SIZE } };
