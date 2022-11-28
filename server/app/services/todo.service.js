const { ObjectId } = require("mongodb");

class TodolistService {
    constructor(client) {
        this.Todolist = client.db().collection("todo");
    }

    extractTodolistData(payload) {
        const todo = {
            username: payload.username,
            title: payload.title,
            content: payload.content,
            time: payload.time,
            modify: payload.modify,
            important: payload.important,
            status: payload.status,
        };

        Object.keys(todo).forEach(
            (key) => todo[key] === undefined && delete todo[key],
        );

        return todo;
    }

    async create(payload) {
        const todo = this.extractTodolistData(payload);
        const result = await this.Todolist.findOneAndUpdate(
            todo,
            {
                $set: {
                    modify: Date(),
                    important: todo.important === true,
                    status: todo.status === true,
                },
            },
            { returnDocument: "after", upsert: true },
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Todolist.find(filter);
        return await cursor.toArray();
    }

    async findByTitle(title) {
        return await this.find({
            title: { $regex: new RegExp(title), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Todolist.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByUsername(username) {
        return await this.Todolist.findOne({
            username: username ? username : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTodolistData(payload);
        const result = await this.Todolist.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" },
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Todolist.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findImportant() {
        return await this.find({ important: true });
    }

    async deleteAll() {
        const result = await this.Todolist.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = TodolistService;
