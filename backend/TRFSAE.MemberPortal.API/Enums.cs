namespace TRFSAE.MemberPortal.API.Enums;

public enum System
{
    Chassis,
    Powertrain,
    Software,
    Business
}

public enum Subsystem
{
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
    AppDev,
    Embedded,
    DataAcq,

    // Business
    Business,
    Finance,
    PublicRelations
    // Public Relations

}

public enum ShirtSize
{
    XS,
    S,
    M,
    L,
    XL,
    XXL
}

public enum Role
{
    SuperAdmin,
    Admin,
    SystemLead,
    SubsystemLead,
    Member
}

public enum ProjectPriority
{
    Low,
    Medium,
    High
}

public enum OrderStatus
{
    Pending,
    Denied,
    Approved,
    Delivering,
    Delivered,
    Claimed
}