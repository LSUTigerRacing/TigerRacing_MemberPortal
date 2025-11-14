export enum System {
    Chassis,
    Powertrain,
    Software,
    Business
};

export enum Subsystem {
    // Chassis
    Frame,
    Aerodynamics,
    Ergonomics,
    Brakes,
    Suspension,

    // Powertrain
    Battery,
    Electronics,
    LowVoltage,
    TractiveSystem,

    // Software
    App,
    Embedded,
    Data,

    // Business
    PublicRelations
}
