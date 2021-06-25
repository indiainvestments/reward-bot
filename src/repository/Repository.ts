import { Users } from "../entity/Users";

class Repository {
    public async getAllUsers() {
        return await Users.find();
    }
}

export default new Repository();