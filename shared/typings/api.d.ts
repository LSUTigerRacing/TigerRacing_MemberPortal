import type { Role, ShirtSize, Subsystem, System } from "../config/enums.ts";

/**
 * Typings for the internal member portal API.
 * These should be kept in sync whenever either the database model and/or API is updated.
 */
export namespace TRAPI {
    interface User {
        id: string
        name: string
        email: string
        role: Role

        sid: integer
        system: System
        subsystem: Subsystem
        gradYear: number

        shirtSize: ShirtSize
        hazingStatus: boolean
        feeStatus: boolean

        createdAt: string
        updatedAt: string
    }

    type FetchUser = Pick<Models.User, "name">;
    type UpdateUser = Omit<Models.User, "id" | "createdAt" | "updatedAt">;
}
