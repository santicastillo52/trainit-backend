"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_provider_1 = __importDefault(require("./providers/prisma.provider"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const passport_config_1 = __importDefault(require("./config/passport.config"));
const cors = require("cors");
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Inicializar Passport
app.use(passport_config_1.default.initialize());
const startApp = async () => {
    try {
        await prisma_provider_1.default.$runCommandRaw({ ping: 1 });
        console.log("Conexión a la base de datos exitosa.");
        app.use(express_1.default.json());
        app.use(cors());
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        app.use("/users", user_routes_1.default);
        app.use("/auth", auth_routes_1.default);
        app.listen(PORT, () => {
            console.log(`El servidor está escuchando en el puerto ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error conectando a la base de datos:", error);
    }
};
startApp();
