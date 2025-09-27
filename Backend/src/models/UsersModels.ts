export interface IUserData {
    name?: string;
    email?: string;
    password_hash: string;
}

export class UsersModels {
    name?: string;
    email?: string;
    password_hash: string;

    constructor(userData: IUserData) {
        this.name = userData.name;
        this.email = userData.email;
        this.password_hash = userData.password_hash;
    }
}