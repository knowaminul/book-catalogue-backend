"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = __importDefault(require("./book.service"));
const book_constant_1 = require("./book.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_model_1 = require("./book.model");
const mongodb_1 = require("mongodb");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = __rest(req.body, []);
    const result = yield book_service_1.default.createBook(book);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
}));
const getRecentlyAddedBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.default.getRecentlyAddedBooks();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recently added books retrieved successfully',
        data: result.data,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    const result = yield book_service_1.default.getAllBooks(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully',
        data: result.data,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.default.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('updateBook controller is called');
    const id = req.params.id;
    const updatedData = req.body;
    console.log('id', id);
    console.log('updatedData', updatedData);
    const result = yield book_service_1.default.updateBook(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.default.deleteBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
        data: result,
    });
}));
const getSearchResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    if (!keyword) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: 'Search term is required',
            data: [],
        });
        return;
    }
    const result = yield book_service_1.default.getSearchResult(keyword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Search result retrieved successfully',
        data: result,
    });
}));
// const addReviewToBook = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const productId = req.params.id
//     const { review } = req.body
//     console.log('Review received:', review)
//     const result = await Book.updateOne(
//       { _id: new ObjectId(productId) },
//       { $push: { reviews: review } }
//     )
//     console.log('Update result:', result)
//     if (result.modifiedCount === 1) {
//       console.log('Review added successfully')
//       res.json({ message: 'Review added successfully' })
//     } else {
//       console.error('Book not found or review not added')
//       res.status(400).json({ error: 'Book not found or review not added' })
//     }
//   } catch (error) {
//     console.error('An error occurred while adding the review:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }
const addReviewToBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const review = req.body.data.review;
    const result = yield book_model_1.Book.updateOne({ _id: new mongodb_1.ObjectId(productId) }, { $push: { reviews: review } });
    if (result.modifiedCount !== 1) {
        console.error('Product not found or review not added');
        res.json({ error: 'Product not found or review not added' });
        return;
    }
    console.log('Review added successfully');
    res.json({ message: 'Review added successfully' });
}));
const getReviewFromBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.default.getReviewFromBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getRecentlyAddedBooks,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    addReviewToBook,
    getReviewFromBook,
    getSearchResult,
};
