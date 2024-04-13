import {IUsersRepositoryPort} from "../Domain/IUsersRepository.port";
import {UsersAggregate} from "../Domain/Users.aggregate";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../Domain/Entities/User.entity";
import {Repository} from "typeorm";
import {UsersDataEntity} from "../Domain/Entities/UsersData.entity";
import {EventBus} from "@nestjs/cqrs";
import {UserCredentials} from "../Domain/Vo/UserCredentials";

@Injectable()
export class UsersRepositoryAdapter implements IUsersRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(UsersDataEntity)
        private readonly usersDataRepository: Repository<UsersDataEntity>,
        private readonly eventBus: EventBus
    ) {}
    async find(id: string): Promise<UsersAggregate> {
        const user = await this.usersRepository.findOneBy({id});

        if (!user) return null;

        const usersAggregate = UsersAggregate.restore({
            id: user.id,
            userCredentials: new UserCredentials(user.username, user.password)
        });

        return usersAggregate;
    }

    async findByUsername(username: string): Promise<UsersAggregate> {
        const user = await this.usersRepository.findOneBy({username});

        if (!user) return null;

        const usersAggregate = UsersAggregate.restore({
            id: user.id,
            userCredentials: new UserCredentials(user.username, user.password)
        });

        return usersAggregate;
    }

    async save(user: UsersAggregate): Promise<void> {
        const events = user.getUncommittedEvents();

        const snapshot = user.getSnapshot();

        await this.usersRepository.upsert(
            {
                id: snapshot.id,
                username: snapshot.userCredentials.getUsername(),
                password: snapshot.userCredentials.getPassword(),
                updatedAt: new Date()
            },
            ["id"]
        );

        this.eventBus.publishAll(events);
    }
}
