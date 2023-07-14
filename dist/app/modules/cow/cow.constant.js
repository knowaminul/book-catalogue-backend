"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowPaginationFields = exports.cowFilterableFields = exports.category = exports.label = exports.breed = exports.location = void 0;
/* eslint-disable no-unused-vars */
exports.location = [
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
];
exports.breed = [
    'Brahman',
    'Nellore',
    'Sahiwal',
    'Gir',
    'Indigenous',
    'Tharparkar',
    'Kankrej',
];
exports.label = ['for sale', 'sold out'];
exports.category = ['Dairy', 'Beef', 'Dual Purpose'];
exports.cowFilterableFields = [
    'searchTerm',
    'location',
    'breed',
    'category',
];
exports.cowPaginationFields = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
];
