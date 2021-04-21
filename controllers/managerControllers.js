const Manager = require("../models/Manager");
const A_OR_AN = "a";
const APP_NAME = "manager";
const {
    encrypt,
    compare
} = require("../utils/encryptor");
const {
    addManagerSchema,
    getMessage,
    editManagerSchema,
    loginManagerSchema,
    changePasswordManager
} = require("../utils/validator");
const {
    createToken
} = require("../utils/jwtAuth");

const reformAllManagers = async (req, res) => {
    try {
        let managers = await Manager
        .find()
        .populate('roleID')
        .exec();

        for (let i = 0; i < managers.length; i++) {
            const manager = managers[i];
            await Manager.findByIdAndUpdate(manager._id, {
                status: true
            });
        }

        managers = await Manager.find()
        .populate('roleID').exec();

        res.json({
            success: true,
            data: managers,
            length: managers.length,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.find()
        .populate('roleID').exec();

        res.json({
            success: true,
            data: managers,
            length: managers.length,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getManagerByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const manager = await Manager.findById(id).populate('roleID').exec();

        if (!manager) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: manager,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const addManager = async (req, res) => {
    try {
        let {
            username,
            password,
            roleID
        } = req.body;

        const validation = addManagerSchema.validate({
            username,
            password,
            roleID
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedManager = await Manager.findOne({
            username
        });

        if (existedManager) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        password = encrypt(password);

        const manager = await new Manager({
            username,
            password,
            roleID,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: manager,
            message: `Successfully created ${A_OR_AN} ${APP_NAME}`,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const managerLogin = async (req, res) => {
    try {
        let {
            username,
            password
        } = req.body;

        const validation = loginManagerSchema.validate({
            username,
            password
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedManager = await Manager.findOne({
            username
        }).populate('roleID').exec();

        if (!existedManager || !compare(password, existedManager.password)) {
            return res.json({
                success: false,
                message: `Invalid email or password`,
                status: 400
            })
        }

        const token = createToken({
            ...existedManager._doc
        });

        res.json({
            success: true,
            data: existedManager,
            token,
            message: `Successfully logged in`,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const {
            id //userID
        } = req.params;
        let {
            oldPassword,
            newPassword
        } = req.body;

        const validation = changePasswordManager.validate({
            oldPassword,
            newPassword
        });

        if (validation.error) {
            console.log(validation.error);
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedManager = await Manager.findById(id);

        if (!existedManager) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        if (!compare(oldPassword, existedManager.password)) {
            return res.json({
                success: false,
                message: `Invalid current password`,
                status: 400
            })
        }

        let manager;
        const last_modified_date = Date.now();

        if (newPassword) {
            let password = encrypt(newPassword);
            manager = await Manager.findByIdAndUpdate(id, {
                password,
                last_modified_date
            });
        } 

        res.json({
            success: true,
            data: manager,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const editManager = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            username,
            password,
            roleID,
            status
        } = req.body;

        const validation = editManagerSchema.validate({
            username,
            password,
            roleID
        });

        if (validation.error) {
            console.log(validation.error);
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedManager = await Manager.findById(id);

        if (!existedManager) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let duplicatedManager = await Manager.findOne({
            username
        });

        if (duplicatedManager && duplicatedManager._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        let manager;
        const last_modified_date = Date.now();

        if (password) {
            password = encrypt(password);
            manager = await Manager.findByIdAndUpdate(id, {
                username,
                password,
                roleID,
                status,
                last_modified_date
            });
        } else {
            manager = await Manager.findByIdAndUpdate(id, {
                username,
                roleID,
                status,
                last_modified_date
            });
        }

        res.json({
            success: true,
            data: manager,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const deleteManager = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        let existedManager = await Manager.findById(id);

        if (!existedManager) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const manager = await Manager.findByIdAndDelete(id);

        res.json({
            success: true,
            data: manager,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

module.exports = {
    getAllManagers,
    getManagerByID,
    addManager,
    editManager,
    deleteManager,
    managerLogin,
    changePassword,
    reformAllManagers
}