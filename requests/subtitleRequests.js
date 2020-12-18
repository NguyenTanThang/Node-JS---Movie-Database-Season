const Subtitles = require("../models/Subtitles");

const removeSubtitleByVideoURL = async (videoURL) => {
    try {
        const subtitle = Subtitles.findOne({
            videoURL
        });
        if (!subtitle) return;
        await Subtitles.findByIdAndDelete(subtitle._id);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeSubtitleByVideoURL
}