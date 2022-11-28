const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

class AccountService {
    constructor(client) {
        this.accountDB = client.db().collection("account");
    }

    extractAccountData(payload) {
        const passHash = bcrypt.hashSync(
            payload.password,
            bcrypt.genSaltSync(5),
            null,
        );
        const account = {
            username: payload.username,
            password: passHash,
        };

        Object.keys(account).forEach(
            (key) => account[key] === undefined && delete account[key],
        );

        return account;
    }
    async signup(payload) {
        const account = this.extractAccountData(payload);
        const result = await this.accountDB.findOneAndUpdate(
            account,
            {
                $set: {
                    type: "user",
                },
            },
            {
                returnDocument: "after",
                upsert: true,
            },
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.accountDB.find(filter);
        return await cursor.toArray();
    }
    async findAccount(filter) {
        return await this.find({ username: filter });
    }
}

module.exports = AccountService;
