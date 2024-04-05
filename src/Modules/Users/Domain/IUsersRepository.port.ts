import {UserEntity} from "./Entities/User.entity";
import {UsersAggregate} from "./Users.aggregate";

export const UsersRepositoryKey = Symbol("UsersRepositoryKey");

export interface IUsersRepositoryPort {
    find(id: string): Promise<UsersAggregate> | UsersAggregate;
    findByUsername(username: string): Promise<UsersAggregate> | UsersAggregate;
    save(user: UsersAggregate): Promise<void> | void;
}
