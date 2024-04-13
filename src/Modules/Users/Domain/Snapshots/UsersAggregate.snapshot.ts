import {UserCredentials} from "../Vo/UserCredentials";

export class UsersAggregateSnapshot {
    constructor(public id: string, public userCredentials: UserCredentials) {}
}
