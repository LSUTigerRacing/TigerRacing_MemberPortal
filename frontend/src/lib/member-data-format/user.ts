import { System, Subsystem, ShirtSize } from "../../../../shared/config/enums";

export interface User {
    /**
     * User UUID
     */
    id: string
    /**
     * User's institution-controlled student ID.
     */
    sid: string
    name: string
    /**
     * User's institutional email.
     */
    email: string
    hazingStatus: boolean
    feeStatus: boolean
    gradDate: number
    shirtSize: ShirtSize
    system: System
    subsystem: Subsystem
    createdAt: string
    updatedAt: string
};

export type UserSearchDto = Pick<User, "name">;
export type UserUpdateDto = Omit<User, "id" | "createdAt" | "updatedAt">;
