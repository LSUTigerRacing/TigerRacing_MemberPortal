export interface User {
    UserId: string
    Name: string
    LSUEmail: string
    PersonalEmail: string
    EightNine: number
    HazingStatus: boolean
    FeeStatus: boolean
    GradDate: string
    ShirtSize: string
    System: string
    Subsystem: string
    AccountCreationDate: string
    AccountLastUpdatedDate: string
};

export interface UserSearchDto {
    Name?: string
}

export interface UserUpdateDto {
    Name?: string
    LSUEmail?: string
    PersonalEmail?: string
    EightNine?: number
    HazingStatus?: boolean
    FeeStatus?: boolean
    GradDate?: string
    ShirtSize?: string
    System?: string
    Subsystem?: string
    AccountLastUpdatedDate?: string
}

export const subsystemCategories = {
    Powertrain: ["Electronics", "Battery", "Low Voltage", "Tractive System"],
    Software: ["Embedded", "App Dev", "Daq"],
    Chassis: ["Frame", "Aero", "Ergo", "Brakes", "Suspension", "Drivetrain"],
    Business: ["Financial", "General Business", "Public Relations"]
} as const;

export type System = keyof typeof subsystemCategories;
export type Subsystem = typeof subsystemCategories[System][number];
