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
        /**
         * This implementation is out of date with regards to the
         * future structure of the system. It will be modified at a later time.
         * DO NOT modify this in an attempt to "sync" the website and Discord
         * without prior authorization. Your PR will be rejected.
         */
        [System.Business]: [
            Subsystem.PublicRelations,
            Subsystem.Finance
        ]
    }
} satisfies Config as Config;

interface Config {
    /**
     * The systems & subsystems in Tiger Racing.
     */
    systems: Record<System, Subsystem[]>
}
