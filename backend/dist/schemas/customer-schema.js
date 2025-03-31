"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const createCustomerSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, "The name must be at least 2 characters long!")
        .required("Please enter your first name!"),
    last_name: Yup.string()
        .min(2, "The last name must be at least 2 characters long!")
        .required("Please enter your last name!"),
    phone_number: Yup.string().required("Please enter your phone number!"),
    email: Yup.string()
        .email("Invalid email format!")
        .matches(/^[^@]+@[^@]+\.[^@]+$/, "Please enter a valid email address!")
        .required("Please enter your email address!"),
    customer_tax_number: Yup.string().required("Please enter your tax number!"),
    customer_address_2: Yup.string()
        .matches(/^[0-9]+$/, "The ZIP code can only contain numbers!")
        .required("Please enter your ZIP code!"),
    customer_address_1: Yup.string().required("Please select a country!"),
    customer_address_3: Yup.string().required("Please enter the city!"),
    customer_address_4: Yup.string().required("Please enter the street and house number!"),
});
exports.default = createCustomerSchema;
