import {AggregateRoot} from "@nestjs/cqrs";
import {v4 as uuid} from "uuid";
import * as crypto from "crypto";
import {SignUpDTO} from "./DTO/SignUpDTO";
import {UserCredentials} from "./Vo/UserCredentials";
import {UsersAggregateSnapshot} from "./Snapshots/UsersAggregate.snapshot";

export class UsersAggregate extends AggregateRoot {
    constructor(private id: string, private userCredentials: UserCredentials) {
        super();
    }

    static create(signUpDTO: SignUpDTO): UsersAggregate {
        const hash = crypto.createHash("sha1");
        hash.update(signUpDTO.password);
        return new UsersAggregate(uuid(), new UserCredentials(signUpDTO.username, hash.digest("hex")));
    }
    static restore(snapshot: UsersAggregateSnapshot): UsersAggregate {
        return new UsersAggregate(snapshot.id, snapshot.userCredentials);
    }

    changePassword(password: string): void {
        this.userCredentials = new UserCredentials(this.userCredentials.getUsername(), password).hash();
    }

    getSnapshot(): UsersAggregateSnapshot {
        return {
            id: this.id,
            userCredentials: this.userCredentials
        };
    }
}
