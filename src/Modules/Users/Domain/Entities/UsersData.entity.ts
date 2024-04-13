import {Column, Entity} from "typeorm";

@Entity("users_data", {schema: "public"})
export class UsersDataEntity {
    @Column("uuid", {
        primary: true,
        name: "id",
        default: () => "uuid_generate_v4()"
    })
    id: string;

    @Column("text", {name: "first_name"})
    firstName: string;

    @Column("text", {name: "last_name"})
    lastName: string;

    @Column("text", {name: "email"})
    email: string;

    @Column("text", {name: "user_id"})
    userId: string;

    @Column("time without time zone", {name: "created_at", default: new Date()})
    createdAt: Date;

    @Column("time without time zone", {name: "updated_at", default: new Date()})
    updatedAt: Date;
}
