/**
 * Enums shared between frontend and database.
 * Note: PostgreSQL requires that all enum members are of type string.
 */

export enum System {
    Chassis = "Chassis",
    Powertrain = "Powertrain",
    Software = "Software",
    Business = "Business"
}

export enum Subsystem {
    // Chassis
    Frame = "Frame",
    Aerodynamics = "Aerodynamics",
    Ergonomics = "Ergonomics",
    Brakes = "Brakes",
    Suspension = "Suspension",

    // Powertrain
    Battery = "Battery",
    Electronics = "Electronics",
    LowVoltage = "Low Voltage",
    TractiveSystem = "Tractive System",

    // Software
    App = "App Development",
    Embedded = "Embedded Systems",
    Data = "Data Acquisition",

    // Business
    PublicRelations = "Public Relations",
    Finance = "Finance"
}

export enum ShirtSize {
    XS = "Extra Small",
    S = "Small",
    M = "Medium",
    L = "Large",
    XL = "Extra Large",
    XXL = "Extra Extra Large"
}

export enum Role {
    SuperAdmin = "Superadmin",
    Admin = "Admin",
    SystemLead = "System Lead",
    SubsystemLead = "Subsystem Lead",
    Member = "Member"
}

export enum ProjectPriority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

export enum OrderStatus {
    Pending = "pending",
    Denied = "denied",
    Approved = "approved",
    Delivering = "delivering",
    Delivered = "delivered",
    Claimed = "claimed"
}
