import { prisma } from "./prisma";
import { SenseCreate, SensingPresetCreate, SensingPresetInput, SensorGroupCreate, SensorInfo, SensorInfoCreate } from "./types";

export async function getAllSenses() {
    return await prisma.sense.findMany({
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
                            frequency: true,
                        }
                    }
                },
            }
        }
    })
}

export async function createSense(sense: SenseCreate) {

    return await prisma.sense.create({
        data: {
            ...sense,
            sensorGroups: sense.sensorGroups && createSensorGroups(sense.sensorGroups)
        }
    })
}

function createSensorGroups(sensorGroups: SensorGroupCreate[]) {
    return {
        create: sensorGroups.map((sensorGroup) => ({
            ...sensorGroup,
            sensingPreset: createSensingPreset(sensorGroup.sensingPreset),
            sensorsInfo: sensorGroup.sensorsInfo && createSensorsInfo(sensorGroup.sensorsInfo)
        })),
    }
}

function createSensingPreset(sensingPreset: SensingPresetInput) {
    return {
        create: sensingPreset.create,
        connect:  sensingPreset.connect != undefined ? {id: sensingPreset.connect} :  sensingPreset.connect,
    }
}

function createSensorsInfo(sensorsInfo: SensorInfoCreate[]) {
    return {
        create: sensorsInfo.map((sensorInfo) =>({
            ...sensorInfo,
        }))
    }
}

export function updateSense(sense: any) {
    return prisma.sense.update({
        where: {
            id: sense.id,
        },
        data: {
        ...sense,
        sensorGroups: sense.sensorGroups && updateSensorGroups(sense.sensorGroups),
            
        }
    })
}

function updateSensorGroups(sensorGroups: any) {
    return {
        create: sensorGroups.add && createSensorGroups(sensorGroups.add).create,
        update: sensorGroups.update?.map((sensorGroup: any) =>({
            where: {
                id: sensorGroup.id
            },
            data: {
                ...sensorGroup,
                sensorsInfo: sensorGroup.sensorsInfo && updateSensorsInfo(sensorGroup.sensorsInfo)
            }
        })),
    }
}

function updateSensorsInfo(sensorsInfo: any) {
    return {
        create: sensorsInfo.add && createSensorsInfo(sensorsInfo.add).create,
        update: sensorsInfo.update?.map((sensorInfo: any) =>({
            where: {
                id: sensorInfo.id,
            },
            data: {
                ...sensorInfo
            }
        })),
    }
}