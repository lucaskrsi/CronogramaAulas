"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = require("./http/router");
const errorHandler_1 = require("./http/middlewares/errorHandler");
// import swaggerDocs from './swagger.json';
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.corsOptions = {
            origin: "*"
        };
        this.middlewares();
    }
    middlewares() {
        this.server.use((0, cors_1.default)(this.corsOptions));
        this.server.use(express_1.default.json());
        this.server.use(router_1.router);
        // this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        this.server.use(errorHandler_1.errorHandler);
    }
}
exports.App = App;
exports.app = new App().server;
