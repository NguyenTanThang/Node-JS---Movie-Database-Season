const Comment = require("../models/Comment");
const A_OR_AN = "a";
const APP_NAME = "comment";
const {addCommentSchema, getMessage} = require("../utils/validator");

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
        .sort({'created_date': -1})
        .populate('customerID')
        .exec();

        res.json({
            success: true,
            data: comments,
            length: comments.length,
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

const getCommentByCustomerID = async (req, res) => {
    try {
        const {customerID} = req.params;
        const comments = await Comment.find({customerID})
        .sort({'created_date': -1})
        .populate('customerID')
        .exec();

        res.json({
            success: true,
            data: comments,
            length: comments.length,
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

const getCommentByMovieID = async (req, res) => {
    try {
        const {movieID} = req.params;
        const comments = await Comment.find({movieSeriesID: movieID})
        .sort({'created_date': -1})
        .populate('customerID')
        .exec();

        res.json({
            success: true,
            data: comments,
            length: comments.length,
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

const addComment = async (req, res) => {
    try {
        let {customerID, movieSeriesID, content} = req.body;
        const validation = addCommentSchema.validate({customerID, movieSeriesID, content});

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let comment = await new Comment({
            customerID, movieSeriesID, content,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        comment = await Comment.findById(comment._id)
        .sort({'created_date': -1})
        .populate('customerID')
        .exec();

        res.json({
            success: true,
            data: comment,
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

const editComment = async (req, res) => {
    try {
        const {commentID} = req.params;
        let {customerID, movieSeriesID, content} = req.body;

        const validation = addCommentSchema.validate({customerID, movieSeriesID, content});

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedComment = await Comment.findById(commentID);

        if (!existedComment) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const last_modified_date = Date.now();
        const comment = await Comment.findByIdAndUpdate(commentID, {customerID, movieSeriesID, content});

        res.json({
            success: true,
            data: comment,
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

const deleteComment = async (req, res) => {
    try {
        const {commentID} = req.params;
        let existedComment = await Comment.findById(commentID);

        if (!existedComment) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const comment = await Comment.findByIdAndDelete(commentID);

        res.json({
            success: true,
            data: comment,
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
    getAllComments,
    getCommentByCustomerID,
    getCommentByMovieID,
    addComment,
    editComment,
    deleteComment
}