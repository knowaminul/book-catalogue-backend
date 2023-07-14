"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const cow_route_1 = require("../modules/cow/cow.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_user_route_1 = require("../modules/auth/auth.user.route");
const auth_admin_route_1 = require("../modules/auth/auth.admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_user_route_1.UserAuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/admins',
        route: auth_admin_route_1.AdminAuthRoutes,
    },
    {
        path: '/cows',
        route: cow_route_1.CowRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
