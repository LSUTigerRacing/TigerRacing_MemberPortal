import { Subsystem, System } from "./enums.js";

export const config = {
    systems: {
        [System.Chassis]: [
            Subsystem.Frame,
            Subsystem.Aerodynamics,
            Subsystem.Ergonomics,
            Subsystem.Brakes,
            Subsystem.Suspension
        ],
        [System.Powertrain]: [
            Subsystem.Battery,
            Subsystem.Electronics,
            Subsystem.LowVoltage,
            Subsystem.TractiveSystem
        ],
        [System.Software]: [
            Subsystem.App,
            /**
             * In association with how the Discord is structured,
             * we keep the Embedded system purely as a software group
             * when referencing it in the website.
             */
            Subsystem.Embedded,
            Subsystem.Data
        ],
        [System.Business]: [
            Subsystem.PublicRelations
        ]
    }

} satisfies Config as Config;

interface Config {
    /**
     * The systems & subsystems in Tiger Racing.
     */
    systems: Record<System, Subsystem[]>
}
