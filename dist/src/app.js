"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const update_table_1 = __importDefault(require("./routes/update-table"));
const logs_1 = __importDefault(require("./routes/logs"));
const device_1 = __importDefault(require("./routes/device"));
const app = (0, express_1.default)();
const port = 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/", index_1.default);
app.use("/register", register_1.default);
app.use("/login", login_1.default);
app.use("/update-table", update_table_1.default);
app.use("/get-logs", logs_1.default);
app.use("/", device_1.default);
app.listen(port, () => console.log(`Application is running on port ${port}`));
exports.default = app;
