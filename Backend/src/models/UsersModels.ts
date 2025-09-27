interface UserData {
    name: string;
    email: string;
}

export class UsersModels {
    name: string;
    email: string;

    constructor(userData: UserData) {
        this.name = userData.name;
        this.email = userData.email;
    }
}