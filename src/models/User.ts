import { IdType } from "../common-types";

export type UserRoles = 'user' | 'admin';
export type AccountStatus = 'active' | 'suspended' | 'deactivated';

export class UserCreateDto {
    constructor(
        public name: string,
        public userName: string,
        public gender: string,
        public role: UserRoles,
        public imageUrl: string,
        public shortDescription: string,
        public accStatus: AccountStatus,
        public dateOfCreation: Date,
        public dateOfLastModification: Date
    ) { }
}

export class User extends UserCreateDto {
    constructor(
        public id: IdType,
        name: string,
        userName: string,
        gender: string,
        role: UserRoles,
        imageUrl: string,
        shortDescription: string,
        accStatus: AccountStatus,
        dateOfCreation: Date,
        dateOfLastModification: Date
    ) {
        super(name, userName, gender, role, imageUrl, shortDescription, accStatus, dateOfCreation, dateOfLastModification);
    }
}
