"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var common_2 = require("@nestjs/common");
var admin_guard_1 = require("../guards/admin.guard");
var ProductsController = function () {
    var _classDecorators = [(0, common_1.Controller)('products')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAll_decorators;
    var _getById_decorators;
    var _deleteById_decorators;
    var _deleteVariant_decorators;
    var _create_decorators;
    var _update_decorators;
    var ProductsController = _classThis = /** @class */ (function () {
        function ProductsController_1(productsService) {
            this.productsService = (__runInitializers(this, _instanceExtraInitializers), productsService);
        }
        ProductsController_1.prototype.getAll = function () {
            return this.productsService.getAll();
        };
        ProductsController_1.prototype.getById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var prod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productsService.getById(id)];
                        case 1:
                            prod = _a.sent();
                            if (!prod)
                                throw new common_2.NotFoundException('Product not found');
                            return [2 /*return*/, prod];
                    }
                });
            });
        };
        ProductsController_1.prototype.deleteById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productsService.getById(id)];
                        case 1:
                            if (!(_a.sent()))
                                throw new common_2.NotFoundException('Product not found');
                            return [4 /*yield*/, this.productsService.deleteById(id)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        ProductsController_1.prototype.deleteVariant = function (productId, variantId) {
            return __awaiter(this, void 0, void 0, function () {
                var product, variantExists, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productsService.getById(productId)];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_2.NotFoundException('Product not found');
                            variantExists = product.colorVariants.some(function (variant) { return variant.id === variantId; });
                            if (!variantExists)
                                throw new common_2.NotFoundException('Variant not found');
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.productsService.deleteVariantById(variantId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { success: true, message: 'Variant deleted successfully' }];
                        case 4:
                            error_1 = _a.sent();
                            console.error("Error deleting variant:", error_1);
                            throw new common_2.NotFoundException('Error deleting variant');
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        ProductsController_1.prototype.create = function (productData, files) {
            return __awaiter(this, void 0, void 0, function () {
                var mainImage, variantImages, parsedColorVariants, updatedColorVariants, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!files || files.length === 0) {
                                throw new common_1.BadRequestException('No files uploaded');
                            }
                            mainImage = files.find(function (f) { return f.fieldname === 'image'; });
                            variantImages = files.filter(function (f) { return f.fieldname === 'variantImages'; });
                            if (!mainImage) {
                                throw new common_1.BadRequestException('Main image is required');
                            }
                            try {
                                parsedColorVariants = typeof productData.colorVariants === 'string'
                                    ? JSON.parse(productData.colorVariants)
                                    : productData.colorVariants;
                            }
                            catch (error) {
                                console.error("Error parsing JSON:", error);
                                throw new common_1.BadRequestException('Invalid JSON format in colorVariants');
                            }
                            if (!Array.isArray(parsedColorVariants) || parsedColorVariants.length === 0) {
                                throw new common_1.BadRequestException('At least one color variant is required');
                            }
                            updatedColorVariants = parsedColorVariants.map(function (variant, index) {
                                var _a;
                                return ({
                                    color: variant.color,
                                    price: variant.price,
                                    imageUrl: "/uploads/products/".concat(((_a = variantImages[index]) === null || _a === void 0 ? void 0 : _a.filename) || ''),
                                });
                            });
                            return [4 /*yield*/, this.productsService.create({
                                    name: productData.name,
                                    price: Number(productData.price),
                                    minPrice: Number(productData.minPrice),
                                    description: productData.description,
                                    categoryId: productData.categoryId,
                                    imageUrl: "/uploads/products/".concat(mainImage.filename),
                                    colorVariants: updatedColorVariants,
                                })];
                        case 1:
                            product = _a.sent();
                            return [2 /*return*/, product];
                    }
                });
            });
        };
        ProductsController_1.prototype.update = function (id, productData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productsService.getById(id)];
                        case 1:
                            if (!(_a.sent()))
                                throw new common_2.NotFoundException('Product not found');
                            return [4 /*yield*/, this.productsService.updateById(id, productData)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        return ProductsController_1;
    }());
    __setFunctionName(_classThis, "ProductsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAll_decorators = [(0, common_1.Get)('/')];
        _getById_decorators = [(0, common_1.Get)('/:id')];
        _deleteById_decorators = [(0, common_1.Delete)('/:id'), (0, common_1.UseGuards)(admin_guard_1.AdminGuard)];
        _deleteVariant_decorators = [(0, common_1.Delete)('/:productId/variants/:variantId'), (0, common_1.UseGuards)(admin_guard_1.AdminGuard)];
        _create_decorators = [(0, common_1.UseGuards)(admin_guard_1.AdminGuard), (0, common_1.Post)('/'), (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
                storage: (0, multer_1.diskStorage)({
                    destination: './public/uploads/products',
                    filename: function (req, file, cb) {
                        var filename = "".concat(Date.now(), "-").concat(file.originalname);
                        cb(null, filename);
                    },
                }),
            }))];
        _update_decorators = [(0, common_1.Put)('/:id'), (0, common_1.UseGuards)(admin_guard_1.AdminGuard)];
        __esDecorate(_classThis, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false, access: { has: function (obj) { return "getAll" in obj; }, get: function (obj) { return obj.getAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getById_decorators, { kind: "method", name: "getById", static: false, private: false, access: { has: function (obj) { return "getById" in obj; }, get: function (obj) { return obj.getById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteById_decorators, { kind: "method", name: "deleteById", static: false, private: false, access: { has: function (obj) { return "deleteById" in obj; }, get: function (obj) { return obj.deleteById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteVariant_decorators, { kind: "method", name: "deleteVariant", static: false, private: false, access: { has: function (obj) { return "deleteVariant" in obj; }, get: function (obj) { return obj.deleteVariant; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductsController = _classThis;
}();
exports.ProductsController = ProductsController;
