import { IdType } from "../common-types";

export type UserRoles = 'user' | 'admin';
export type AccountStatus = 'active' | 'suspended' | 'deactivated';

export class UserCreateDto {
    constructor(
        public name: string,
        public username: string,
        public gender: string,
        public role: UserRoles,
        public imageURL: string,
        public shortDescription: string,
        public status: AccountStatus,
        public dateOfCreation: Date,
        public dateOfLastModification: Date
    ) { }
}

export class User extends UserCreateDto {
    constructor(
        public id: IdType,
        name: string,
        username: string,
        gender: string,
        role: UserRoles,
        imageURL: string,
        shortDescription: string,
        status: AccountStatus,
        dateOfCreation: Date,
        dateOfLastModification: Date
    ) {
        super(name, username, gender, role, imageURL, shortDescription, status, dateOfCreation, dateOfLastModification);
    }
}
