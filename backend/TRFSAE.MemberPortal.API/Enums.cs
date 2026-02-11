using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TRFSAE.MemberPortal.API.Enums;

[JsonConverter(typeof(StringEnumConverter))]
public enum TRSystem
{
    Chassis,
    Powertrain,
    Software,
    Business
}

[JsonConverter(typeof(StringEnumConverter))]
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
    App,
    Embedded,
    Data,

    // Business
    Finance,
    PublicRelations
}

[JsonConverter(typeof(StringEnumConverter))]
public enum ShirtSize
{
    XS,
    S,
    M,
    L,
    XL,
    XXL
}

[JsonConverter(typeof(StringEnumConverter))]
public enum Role
{
    SuperAdmin,
    Admin,
    SystemLead,
    SubsystemLead,
    Member
}

[JsonConverter(typeof(StringEnumConverter))]
public enum ProjectPriority
{
    Low,
    Medium,
    High
}

[JsonConverter(typeof(StringEnumConverter))]
public enum OrderStatus
{
    Pending,
    Denied,
    Approved,
    Delivering,
    Delivered,
    Claimed
}
