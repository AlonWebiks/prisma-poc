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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSense = exports.getAllSenses = void 0;
const prisma_1 = require("./prisma");
function getAllSenses() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.sense.findMany({
            include: {
                sensorGroups: {
                    include: {
                        sensingPreset: {
                            select: {
                                id: true,
                                name: true,
                                number: true,
                            }
                        },
                        sensorsInfo: {
                            select: {
                                id: true,
                            }
                        }
                    },
                }
            }
        });
    });
}
exports.getAllSenses = getAllSenses;
function createSense(sense) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.sense.create({
            data: Object.assign(Object.assign({}, sense), { sensorGroups: createSensorGroups(sense.sensorGroups) })
        });
    });
}
exports.createSense = createSense;
function createSensorGroups(sensorGroups) {
    return {
        create: sensorGroups.map((sensorGroup) => (Object.assign(Object.assign({}, sensorGroup), { sensingPreset: createSensingPreset(sensorGroup.sensingPreset), sensorsInfo: createSensorsInfo(sensorGroup.sensorsInfo) }))),
    };
}
function createSensingPreset(sensingPreset) {
    return {
        create: sensingPreset.create,
        connect: sensingPreset.connect && { id: sensingPreset.connect },
    };
}
function createSensorsInfo(sensorsInfo) {
    return {
        create: sensorsInfo.map((sensorInfo) => (Object.assign({}, sensorInfo)))
    };
}
//# sourceMappingURL=sense.js.map