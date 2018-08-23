import { User } from "../../model/User";
import { getRepository, getConnection, Repository, UpdateResult } from "typeorm";
import { ABError } from "../../model/ABError";

export class UsersService {
    userRepo: Repository<User>;
    async getRepo() {
        return (this.userRepo) ? this.userRepo : await getConnection("UsersMongoDB").getRepository(User);
    }
    async getAllUsers(): Promise<Array<User>> {
        const repo = await this.getRepo();
        return await repo.find();
    }

    async createUser(user: User): Promise<User> {
        await user.validate();
        const repo = await this.getRepo();
        return await repo.save(user);
    }

    async updateUser(id: string, updateUser: User): Promise<User> {
        await updateUser.validate();
        const repository = await this.getRepo();
        let user: User = await repository.findOne(id);
        if (!user) throw new ABError({ "status": 404, "error": `Could not update user with id ${id}` });
        await repository.update(id, updateUser);
        return updateUser;
    }

    async removeUser(id: string): Promise<User> {
        const repository = await this.getRepo();
        const user: User = await repository.findOne(id);
        if (!user) throw new ABError({ "status": 404, "error": `Could not remove user with id ${id}` });
        return await repository.remove(user);
    }
}

export default new UsersService();