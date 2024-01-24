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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("API Tests", () => {
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "testpassword"
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("username", "testuser");
        expect(response.body).toHaveProperty("email", "test@example.com");
        // You can add more assertions based on your response structure
    }));
    it("should reject duplicate registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "testpassword"
        });
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("error", "Username or email already exists");
    }));
    it("should login with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/login").send({
            username: "testuser",
            password: "testpassword"
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Login successful");
    }));
    it("should reject login with invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/login").send({
            username: "nonexistentuser",
            password: "invalidpassword"
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error", "Invalid username or password");
    }));
});
