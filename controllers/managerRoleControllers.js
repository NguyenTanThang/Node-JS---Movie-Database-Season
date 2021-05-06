const ManagerRole = require("../models/ManagerRole");
const A_OR_AN = "a";
const APP_NAME = "manager role";

const getAllManagerRoles = async (req, res) => {
    try {
        const managerRoles = await ManagerRole.find();

        res.json({
            success: true,
            data: managerRoles,
            length: managerRoles.length
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

const getManagerRoleByID = async (req, res) => {
    try {
        const {id} = req.params;
        const managerRole = await ManagerRole.findById(id);

        res.json({
            success: true,
            data: managerRole
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

const addManagerRole = async (req, res) => {
    try {
        let {role} = req.body;
        const managerRole = await new ManagerRole({
            role,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: managerRole,
            message: `Successfully created ${A_OR_AN} ${APP_NAME}`
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

const editManagerRole = async (req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const last_modified_date = Date.now();
        const managerRole = await ManagerRole.findByIdAndUpdate(id, {
            role, last_modified_date
        });

        res.json({
            success: true,
            data: managerRole,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`
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

const deleteManagerRole = async (req, res) => {
    try {
        const {id} = req.params;
        const managerRole = await ManagerRole.findByIdAndDelete(id);

        res.json({
            success: true,
            data: managerRole,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`
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
    getAllManagerRoles,
    getManagerRoleByID,
    addManagerRole,
    editManagerRole,
    deleteManagerRole,
}