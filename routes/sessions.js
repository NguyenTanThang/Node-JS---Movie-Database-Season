var express = require('express');
var router = express.Router();
const {
    getSessionByID,
    refreshSession,
    getAllSessions,
    deleteSession
} = require("../controllers/sessionControllers");

router.get('/', getAllSessions);

router.get('/:sessionID', getSessionByID);

router.put('/refresh/:sessionID', refreshSession);

router.delete('/delete/:sessionID', deleteSession);

module.exports = router;
