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
    PublicRelations = "Public Relations"
}
