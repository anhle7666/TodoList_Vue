const AccountService = require("../services/account.service");
const TodoListService = require("../services/todo.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const bcrypt = require("bcrypt");

function validatePasword(password) {
    return password.match(
        // Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    );
}
exports.signup = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username không được trống"));
    }
    if (!validatePasword(req.body?.password)) {
        return next(
            new ApiError(
                400,
                "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt",
            ),
        );
    }

    const accountService = new AccountService(MongoDB.client);
    try {
        const username = await accountService.findAccount(req.body.username);
        if (req.body.username == username[0].username) {
            return next(
                new ApiError(
                    400,
                    "Username đã tổn tại " + username[0].username,
                ),
            );
        }
    } catch (error) {
        const document = await accountService.signup(req.body);
        return res.send(document);
    }
};

exports.signin = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username không được trống"));
    }
    if (!validatePasword(req.body?.password)) {
        return next(
            new ApiError(
                400,
                "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt",
            ),
        );
    }

    try {
        const accountService = new AccountService(MongoDB.client);
        const account = await accountService.findAccount(req.body.username);

        if (req.body.username == account[0].username) {
            const match = await bcrypt.compare(
                req.body.password,
                account[0].password,
            );
            if (match) {
                // return Data.
                res.send(account);
                //
            } else {
                return next(new ApiError(500, "Đăng nhập sai mật khẩu."));
            }
        }
    } catch {
        return next(new ApiError(500, "Tài khoản không tồn tại."));
    }
};
