"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var db = new client_1.PrismaClient();
var bcrypt = require("bcrypt");
function getProducts() {
    return [
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
            name: 'Led Strip',
            price: 50,
            minPrice: 30,
            description: 'Cheap, ideal for beginners with working on lightings',
            categoryId: 'f930e19d-a622-4bdd-8ba6-dbbf98124e21',
            imageUrl: "/uploads/products/led-strip-main.png",
            colorVariants: [
                {
                    id: 'c2e707b8-ffd0-494b-92cd-c6d2e03e82b4',
                    color: 'Red',
                    price: 50,
                    imageUrl: "/uploads/products/led-strip-red.png"
                },
                {
                    id: 'd8221698-509d-4de5-b6f8-25ee02591dbe',
                    color: 'Green',
                    price: 50,
                    imageUrl: "/uploads/products/led-strip-green.png"
                },
                {
                    id: '74dccd27-6dfb-4bb7-abbe-fb69ebc060c8',
                    color: 'Blue',
                    price: 30,
                    imageUrl: "/uploads/products/led-strip-blue.png"
                },
                {
                    id: '10e7563c-7dbe-4f80-aaa2-f3ec6a771ede',
                    color: 'White',
                    price: 30,
                    imageUrl: "/uploads/products/led-strip-main.png"
                },
            ],
        },
        {
            id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
            name: 'Led Bulb',
            price: 30,
            minPrice: 15,
            description: 'Easy installation, own application on mobile phone',
            categoryId: "8e5282b1-a7b6-4172-b88e-eddd78e6f62f",
            imageUrl: "/uploads/products/led-bulb-main.png",
            colorVariants: [
                {
                    id: 'e69c5bec-8642-4498-826c-4e74efbdb0e8',
                    color: 'RGB',
                    price: 30,
                    imageUrl: "/uploads/products/led-bulb-RGB.png"
                },
                {
                    id: '138fff4e-25fd-4a99-8f38-50ec30557287',
                    color: 'White',
                    price: 15,
                    imageUrl: "/uploads/products/led-bulb-main.png"
                },
            ],
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
            name: 'Led Neon Standing Light',
            price: 70,
            minPrice: 55,
            description: 'Plug in and ready, Beautiful color, Big variety',
            categoryId: "dcd8d654-0b9a-48f0-a19c-9aa9c45c968a",
            imageUrl: "/uploads/products/led-neon-stand-main.png",
            colorVariants: [
                {
                    id: 'ca41d86b-4804-4f60-bb35-d4ff21ebb75d',
                    color: 'RGB',
                    price: 70,
                    imageUrl: "/uploads/products/led-neon-stand-RGB.png"
                },
                {
                    id: '709e9f34-2514-4c61-b0c6-d3aeb9f98ac9',
                    color: 'Red',
                    price: 60,
                    imageUrl: "/uploads/products/led-neon-stand-red.png"
                },
                {
                    id: 'b02ef145-9649-46a4-a7ed-a42cff5b7518',
                    color: 'Green',
                    price: 60,
                    imageUrl: "/uploads/products/led-neon-stand-green.png"
                },
                {
                    id: '7e46c361-49e3-45f4-a60b-7a2d8bdee8c1',
                    color: 'Blue',
                    price: 60,
                    imageUrl: "/uploads/products/led-neon-stand-blue.png"
                },
                {
                    id: 'a4e3faf9-c93a-40e1-9b7d-be75bde2559f',
                    color: 'White',
                    price: 55,
                    imageUrl: "/uploads/products/led-neon-stand-main.png"
                },
                {
                    id: '4b90249d-45c8-442f-bd1e-c2d6751e4be4',
                    color: 'Custom',
                    price: 85,
                    imageUrl: "/uploads/products/led-neon-stand-custom.png"
                },
            ],
        },
    ];
}
function getOrders() {
    return [
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
            clientId: '5a429f93-939d-4500-9bfe-dfa3324e7885',
            productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
            clientId: 'c4d8f1f1-4f72-47a7-8db7-c5ed0b1f72b7',
            productId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
            clientId: 'a392d9e3-cb7a-4ec3-973e-ef33f70a72db',
            productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
        },
    ];
}
function getClients() {
    return [
        {
            id: 'c4d8f1f1-4f72-47a7-8db7-c5ed0b1f72b7',
            name: 'John Doe',
            email: 'Doe123@gmail.com',
            address: 'Poland, Warsaw, 123',
        },
        {
            id: 'a392d9e3-cb7a-4ec3-973e-ef33f70a72db',
            name: 'Amanda Cerny',
            email: 'amanda.cerny@gmail.com',
            phone: '987 242 212',
            address: 'Poland, Cracow, 456',
        },
        {
            id: '5a429f93-939d-4500-9bfe-dfa3324e7885',
            name: 'Christian Bale',
            email: 'christianB@gmail.com',
            phone: '789 012 984',
            address: 'England, London, 78',
        },
    ];
}
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, existingAdmin, hashedPassword;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categories = [
                        { id: 'f930e19d-a622-4bdd-8ba6-dbbf98124e21', name: 'Strips' },
                        { id: '8e5282b1-a7b6-4172-b88e-eddd78e6f62f', name: 'Bulbs' },
                        { id: 'dcd8d654-0b9a-48f0-a19c-9aa9c45c968a', name: 'Neon Standing Lights' },
                        { id: '1712608e-efee-4f1d-8750-ab841bc6a938', name: 'Led Hex Panels' },
                    ];
                    return [4 /*yield*/, Promise.all(categories.map(function (category) { return __awaiter(_this, void 0, void 0, function () {
                            var existingCategory;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.category.findUnique({
                                            where: { id: category.id },
                                        })];
                                    case 1:
                                        existingCategory = _a.sent();
                                        if (!!existingCategory) return [3 /*break*/, 3];
                                        return [4 /*yield*/, db.category.create({ data: category })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Promise.all(getClients().map(function (client) { return __awaiter(_this, void 0, void 0, function () {
                            var existingClient;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.client.findUnique({
                                            where: { id: client.id },
                                        })];
                                    case 1:
                                        existingClient = _a.sent();
                                        if (!!existingClient) return [3 /*break*/, 3];
                                        return [4 /*yield*/, db.client.create({ data: client })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Promise.all(getProducts().map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                            var existingProduct, createdProduct_1, createdVariants;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.product.findUnique({
                                            where: { id: product.id },
                                        })];
                                    case 1:
                                        existingProduct = _a.sent();
                                        if (!!existingProduct) return [3 /*break*/, 4];
                                        return [4 /*yield*/, db.product.create({
                                                data: {
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    minPrice: product.minPrice,
                                                    description: product.description,
                                                    categoryId: product.categoryId,
                                                    imageUrl: product.imageUrl,
                                                },
                                            })];
                                    case 2:
                                        createdProduct_1 = _a.sent();
                                        return [4 /*yield*/, Promise.all(product.colorVariants.map(function (variant) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, db.colorVariant.create({
                                                                data: {
                                                                    id: variant.id,
                                                                    color: variant.color,
                                                                    price: variant.price,
                                                                    imageUrl: variant.imageUrl,
                                                                    productId: createdProduct_1.id,
                                                                },
                                                            })];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                });
                                            }); }))];
                                    case 3:
                                        createdVariants = _a.sent();
                                        console.log("Product added: ".concat(createdProduct_1.name, " with ").concat(createdVariants.length, " variants."));
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Promise.all(getOrders().map(function (_a) { return __awaiter(_this, void 0, void 0, function () {
                            var existingOrder;
                            var clientId = _a.clientId, productId = _a.productId, orderData = __rest(_a, ["clientId", "productId"]);
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, db.order.findUnique({
                                            where: { id: orderData.id },
                                        })];
                                    case 1:
                                        existingOrder = _b.sent();
                                        if (!!existingOrder) return [3 /*break*/, 3];
                                        return [4 /*yield*/, db.order.create({
                                                data: __assign(__assign({}, orderData), { product: {
                                                        connect: { id: productId },
                                                    }, client: {
                                                        connect: { id: clientId },
                                                    } }),
                                            })];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.admin.findFirst()];
                case 5:
                    existingAdmin = _a.sent();
                    if (!!existingAdmin) return [3 /*break*/, 8];
                    return [4 /*yield*/, bcrypt.hash("admin123", 10)];
                case 6:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, db.admin.create({
                            data: {
                                login: "admin",
                                password: hashedPassword,
                            },
                        })];
                case 7:
                    _a.sent();
                    console.log("Admin account created! Login: admin, Password: admin123");
                    return [3 /*break*/, 9];
                case 8:
                    console.log("Admin already exists, skipping...");
                    _a.label = 9;
                case 9:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
seed();
