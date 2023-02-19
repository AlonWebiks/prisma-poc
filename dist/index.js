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
const express_1 = __importDefault(require("express"));
const sense_1 = require("./sense");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/sense', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senses = yield (0, sense_1.getAllSenses)();
        res.send(senses);
    }
    catch (err) {
        next(err);
    }
}));
app.post('/sense', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senseCreate = req.body.sense;
        res.status(201).end();
    }
    catch (err) {
        next(err);
    }
}));
app.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=index.js.map