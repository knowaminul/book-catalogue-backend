"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        address: zod_1.z.string({
            required_error: ' Address is required',
        }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
};
