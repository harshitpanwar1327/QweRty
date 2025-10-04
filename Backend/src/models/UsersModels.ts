interface UserData {
    uid: string;
    name: string;
    email: string;
}

export class UsersModels {
    uid: string;
    name: string;
    email: string;

    constructor(userData: UserData) {
        this.uid = userData.uid;
        this.name = userData.name;
        this.email = userData.email;
    }
}