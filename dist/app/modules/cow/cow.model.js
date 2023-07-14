"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_1 = require("../../../enums/cow");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: [
            cow_1.ENUM_COW_LOCATION.Dhaka,
            cow_1.ENUM_COW_LOCATION.Chattogram,
            cow_1.ENUM_COW_LOCATION.Barishal,
            cow_1.ENUM_COW_LOCATION.Rajshahi,
            cow_1.ENUM_COW_LOCATION.Sylhet,
            cow_1.ENUM_COW_LOCATION.Comilla,
            cow_1.ENUM_COW_LOCATION.Rangpur,
            cow_1.ENUM_COW_LOCATION.Mymensingh,
        ],
        required: true,
    },
    breed: {
        type: String,
        enum: [
            cow_1.ENUM_COW_BREED.Brahman,
            cow_1.ENUM_COW_BREED.Nellore,
            cow_1.ENUM_COW_BREED.Sahiwal,
            cow_1.ENUM_COW_BREED.Gir,
            cow_1.ENUM_COW_BREED.Indigenous,
            cow_1.ENUM_COW_BREED.Tharparkar,
            cow_1.ENUM_COW_BREED.Kankrej,
        ],
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: [cow_1.ENUM_COW_LABEL.ForSale, cow_1.ENUM_COW_LABEL.SoldOut],
        default: cow_1.ENUM_COW_LABEL.ForSale,
    },
    category: {
        type: String,
        enum: [
            cow_1.ENUM_COW_CATEGORY.Dairy,
            cow_1.ENUM_COW_CATEGORY.Beef,
            cow_1.ENUM_COW_CATEGORY.DualPurpose,
        ],
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)('Cow', cowSchema);
