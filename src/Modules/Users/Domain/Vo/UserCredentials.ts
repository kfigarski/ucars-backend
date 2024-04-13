import * as crypto from "crypto";

export class UserCredentials {
    constructor(private username: string, private password: string) {}

    isEqual(userCredentials: UserCredentials): boolean {
        if (userCredentials.username === this.username && userCredentials.password === this.password) {
            return true;
        }
        return false;
    }

    hash(): UserCredentials {
        const hash = crypto.createHash("sha1");
        hash.update(this.password);
        this.password = hash.digest("hex");
        return this;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }
}
