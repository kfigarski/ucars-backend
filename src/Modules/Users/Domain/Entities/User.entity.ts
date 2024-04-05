import {Column, Entity} from "typeorm";

@Entity("users", {schema: "public"})
export class UserEntity {
    @Column("uuid", {
        primary: true,
        name: "id",
        default: () => "uuid_generate_v4()"
    })
    id: string;

    @Column("text", {name: "username", nullable: false})
    username: string;

    @Column("text", {name: "password", nullable: false})
    password: string;

    @Column("time without time zone", {name: "created_at", default: new Date()})
    createdAt: Date;

    @Column("time without time zone", {name: "updated_at", default: new Date()})
    updatedAt: Date;
}
