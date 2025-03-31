"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const base_1 = require("../constants/base");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: base_1.DATABASE_URL,
        },
    },
});
exports.default = prisma;
