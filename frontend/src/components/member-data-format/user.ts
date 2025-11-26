export interface User {
    userId: string
    name: string
    personalEmail: string
    lsuEmail: string
    eightNine: number
    hazingStatus: boolean
    feeStatus: boolean
    gradDate: string
    shirtSize: string
    system: string
    subsystem: string
    accountCreationDate: string
    accountLastUpdatedDate: string
};

export interface UserSearchDto {
    name?: string
    gradDate?: string
    lsuEmail?: string
    system?: string
    subsystem?: string
}

export interface UserUpdateDto {
    name?: string
    lsuEmail?: string
    personalEmail?: string
    eightNine?: number
    hazingStatus?: boolean
    feeStatus?: boolean
    gradDate?: string
    shirtSize?: string
    system?: string
    subsystem?: string
    accountLastUpdatedDate?: string
}

export const subsystemCategories = {
    Powertrain: ["Electronics", "Battery", "Low Voltage", "Tractive System"],
    Software: ["Embedded", "App Dev", "Daq"],
    Chassis: ["Frame", "Aero", "Ergo", "Brakes", "Suspension", "Drivetrain"],
    Business: ["Financial", "General Business", "Public Relations"]
} as const;

export type System = keyof typeof subsystemCategories;
export type Subsystem = typeof subsystemCategories[System][number];
