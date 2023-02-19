
type Maybe<T> = T | null;

export interface Sense {
    id: string;
    name: string;
    sensorGroups: SensorGroup[];
}

export interface SensorGroup {
    id: string;
    name: string;
    sensingPreset: SensingPreset;
    sensorsInfo: SensorInfo[];
}

export interface SensingPreset {
    id: string;
    name: string;
    number: number;
}

export interface SensorInfo {
    id: string;
    frequency: number;
}

export type SenseCreate = Omit<Sense, "sensorGroups"> & {
    sensorGroups: SensorGroupCreate[]; 
}

export type SensorGroupCreate = Omit<SensorGroup, "sensingPreset" | "sensorsInfo"> & {
    sensingPreset: SensingPresetInput;
    sensorsInfo: SensorInfoCreate[]
}

export type SensingPresetCreate = Omit<Partial<SensingPreset>, "name" | "number"> & {
    name: string;
} 

export interface SensingPresetInput {
    create?: SensingPresetCreate;
    connect?: string;
}

export type SensorInfoCreate = Omit<SensorInfo, "id"> & {
    id?: string
} 
