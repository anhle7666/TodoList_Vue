const TodolistService = require("../services/todo.service");
// const AccountService = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");
const AccountService = require("../services/account.service");

exports.create = async (req, res, next) => {
    if (!req.body?.content) {
        return next(new ApiError(400, "Content cannot be empty"));
    }
    if (!req.body?.title) {
        return next(new ApiError(400, "Title cannot be empty"));
    }
    try {
        const todoService = new TodolistService(MongoDB.client);
        const document = await todoService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error ocurred while creating the account"),
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const todoService = new TodolistService(MongoDB.client);
        const { title } = req.query;
        if (title) {
            documents = await todoService.findByTitle(title);
        } else {
            documents = await todoService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items"),
        );
    }

    return res.send(documents);
};

exports.findAllInAccount = async (req, res, next) => {
    try {
        const todoService = new TodolistService(MongoDB.client);
        // const accountService = new AccountService(MongoDB.client);
        const documents = [];
        const { username } = req.query;
        documents = await todoService.findByUsername(username);

        res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`,
            ),
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const todoService = new TodolistService(MongoDB.client);
        const document = await todoService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Todo not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`,
            ),
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }
    try {
        const todoService = new TodolistService(MongoDB.client);
        const document = await todoService.update(req.params.id, req.body);
        if (!document) {
            return await next(new ApiError(404, "Todolist not found"));
        }
        return await res.send({ message: "Todolist was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating contact with id=${req.params.id}`,
            ),
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const todoService = new TodolistService(MongoDB.client);
        const document = await todoService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`,
            ),
        );
    }
};
exports.findAllImportant = async (req, res, next) => {
    try {
        const todoService = new TodolistService(MongoDB.client);
        const document = await todoService.findImportant();
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured retrieving favorite contacts"),
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const todoService = new TodolistService(MongoDB.client);
        const deletedCount = await todoService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts"),
        );
    }
};
